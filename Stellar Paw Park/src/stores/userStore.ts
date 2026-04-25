import { defineStore } from 'pinia'
import { userType, dogType } from '../types/storeTypes'
import db from '../firebase'
import { 
    DocumentReference, 
    QuerySnapshot, 
    collection, 
    doc, 
    getDoc,
    updateDoc,
    increment,
    arrayRemove, 
    query, 
    setDoc, 
    where,
    onSnapshot,
    deleteDoc,
} from 'firebase/firestore';
import { User } from '@firebase/auth';
import { useAuthStore } from './authStore';

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        loading: true,
        user: null as userType | null,
        dogs: [] as dogType[],
        dogListener: null as (() => void) | null,
        bookingListener: null as (() => void) | null,
        deleteBooking: false,
        deleteBookingInfo: {} as {id: string, date: string, dogs: [], time: number, area: string},
        confirmation: false,
        bookings:[] as {id: string, date: string, dogs: [], time: number, area: string}[],
        headers: [
            {title: "Date", key: 'date'},
            {title: "Time", key: 'time'},
            {title: "Area", key: 'area'},
            {title: "Dogs", key: 'dogs'},
            {title: "Cancel", key: 'actions', sortable: false},
        ]
    }),
    actions: {
        async setUser(user: User) {
            this.loading = true;

            const userDoc: DocumentReference = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                this.user = userSnap.data() as userType;
                this.initDogListener();
                this.initBookingListener();
            }
            else {
                await this.createUser(user);
            }
            this.loading = false;
        },
        async createUser(user: User) {
            const authStore = useAuthStore();
            const newUser: userType = {
                userId: user.uid,
                name: user.displayName || authStore.fname + " " + authStore.lname || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                admin: false,
            };
            await setDoc(doc(db, 'users', user.uid), newUser);
            this.user = newUser;
        },
        clearUser() {
            this.user = null;
            this.dogs = [];
        },
        initDogListener () {
            if (!this.user?.userId) return;
            
            if (this.dogListener) {
                this.dogListener();
            }

            const dogColl = query(collection(db, 'dogs'), where('ownerId', '==', this.user.userId ));
            this.dogListener = onSnapshot(dogColl, (s: QuerySnapshot) => {
                for (let change of s.docChanges()) {
                    const dogData = change.doc.data() as dogType;
                    if (change.type === 'added') {
                        this.dogs.push({...dogData, id: change.doc.id})
                    }
                    else if (change.type === 'modified') {
                        const index = this.dogs.findIndex(i => i.id === dogData.id)
                        this.dogs[index] = dogData;
                    }
                    else {
                        this.dogs = this.dogs.filter((i) => i.id != dogData.id)
                    }
                }
            })
        },
        async initBookingListener() {
            if (!this.user) {
                return;
            }
            if (this.bookingListener) {
                this.bookingListener()
            }
            const getBookColl = query(collection(db, 'userBookings', this.user.userId, 'bookings'));
            this.bookingListener = onSnapshot(getBookColl, (s: QuerySnapshot) => {
                for (let change of s.docChanges()) {
                    const bookingData = change.doc.data();
                    if (change.type === 'added') {
                        this.bookings.push({
                            id: change.doc.id, 
                            area: bookingData.area as string, 
                            time: bookingData.time as number, 
                            date: bookingData.date as string, 
                            dogs: bookingData.dogs as []})
                    }
                    else if (change.type === 'removed') {
                        this.bookings = this.bookings.filter((i) => i.id != change.doc.id)
                    }
                }
            })
        },
        async cancelBooking() {
            if (!this.user) {
                return;
            }

            const bookingRef = doc(db, "bookingsByDate", this.deleteBookingInfo.date);
            const hourKey = String(this.deleteBookingInfo.time);
            const areaKey = this.deleteBookingInfo.area;
            await updateDoc(bookingRef, {
                [`hours.${hourKey}.${areaKey}.dogCount`]:
                    increment(-this.deleteBookingInfo.dogs.length),

                [`hours.${hourKey}.${areaKey}.dogId`]:
                    arrayRemove(...this.deleteBookingInfo.dogs),

                [`hours.${hourKey}.${areaKey}.userId`]:
                    arrayRemove(this.user.userId)
            });

            const removeDoc = doc(db, "userBookings", this.user.userId, "bookings", this.deleteBookingInfo.id)
            await deleteDoc(removeDoc);

            this.confirmation = false;
            this.deleteBooking = false;
        },
        formatHour(hour: number): string {
            const suffix = hour >= 12 ? "PM" : "AM"
            const formatted = hour % 12 || 12
            return `${formatted.toString().padStart(2, " ")}:00 ${suffix}`
        },
        getDogNames(dogs: []) {
            const map = new Map(this.dogs.map(d => [d.id, d.name]));
            return dogs.map(id => map.get(id))
            .filter((name): name is string => name !== undefined);
        }
    },
})