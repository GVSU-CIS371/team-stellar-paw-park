import { defineStore } from 'pinia'
import { userType, dogType } from '../types/storeTypes'
import db from '../firebase'
import { 
    DocumentReference, 
    QuerySnapshot, 
    collection, 
    doc, getDoc, 
    getDocs, 
    Query,
    query, 
    setDoc, 
    where,
    onSnapshot,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { User } from '@firebase/auth';
import { useAuthStore } from './authStore';

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        loading: true,
        user: null as userType | null,
        dogs: [] as dogType[],
        dogListener: null as (() => void) | null,
        bookings:[] as {date: Date, dogs: [], hour: Number, area: ""}[],
        headers: [
            {title: "Date", key: 'date'},
            {title: "Hour", key: 'hour'},
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
                this.bookingsInit();
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
                this.dogListener = null;
            }

            const dogColl = query(collection(db, 'dogs'), where('ownerId', '==', this.user.userId ));
            this.dogListener = onSnapshot(dogColl, (s: QuerySnapshot) => {
                for (let change of s.docChanges()) {
                    const dogData = change.doc.data() as dogType;
                    if (change.type === 'added') {
                        this.dogs.push(dogData)
                    }
                    else if (change.type === 'modified') {
                        const index = this.dogs.findIndex(i => i.name === dogData.name)
                        this.dogs[index] = dogData;
                    }
                    else {
                        this.dogs = this.dogs.filter((i) => i.name != dogData.name)
                    }
                }
            })
        },
        async bookingsInit() {
            const getBookColl: Query = query( collection(db, "bookings"), where("user", "==", this.user?.userId));
            await getDocs(getBookColl).then((qs: QuerySnapshot) => {
                qs.forEach((qd: QueryDocumentSnapshot) => {
                    const bookData = qd.data();
                    const date = bookData.date.toDate();
                    const formattedDate = date.toLocaleDateString("en-CA");
                    this.bookings.push({date: formattedDate, dogs: bookData.dogs, hour: bookData.hour, area: bookData.area})
                    console.log(this.bookings);
                })
            })
        },
        cancelBooking(bookingInfo: {date: Date, dogs: [], hour: Number, area: ""}) {

        }
    },
})