import { defineStore } from 'pinia'
import { areaType, dogType, hourType, slotType, userType } from '../types/storeTypes'
import db from '../firebase'
import { 
    addDoc, 
    collection, 
    setDoc,
    updateDoc,
    increment,
    arrayUnion,
    doc,
    getDoc,
    getDocs,
    DocumentReference,
    DocumentSnapshot,
    onSnapshot,
} from 'firebase/firestore';

export const useBookingStore = defineStore('BookingStore', {
    state: () => ({ 
        selectedDate: new Date(),
        date: '',
        callendarMessage: '',
        errorMessage: '',
        showError: false,
        booking: false,
        hours: {} as hourType,
        timeSlots: [] as slotType[],
        areas: [] as areaType[],
        bookingUnsubscribe: null as null | (() => void),
        selectedDogId: [],
        selectedSlot: {} as slotType,
    }),
    actions: {
        async bookingsInit () {
            // Pull areas
            const areasSnapshot = await getDocs(collection(db, 'areas'));
            this.areas = areasSnapshot.docs.map(doc => ({
                name:doc.id, 
                ...(doc.data() as Omit<areaType, "name">)
            }))
        },
        async formatDate() {
            this.callendarMessage = '';
            const day = this.selectedDate.getDate();
            const month = this.selectedDate.getMonth() + 1;
            const year = this.selectedDate.getFullYear();
            this.date = year.toString() + "-" + month.toString() + "-" + day.toString();
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            if (this.selectedDate < todayDate) {
                this.callendarMessage = "Unable to view previous days, please select another day!"
                this.timeSlots = [];
                return;
            }
            // Check if closed on day selected and update error message
            if (this.selectedDate.getDay() === 0) {
                this.callendarMessage = "We are closed on Sunday, please select another day!"
                this.timeSlots = [];
                return;
            }
            const closeRef = doc(db, "closures", this.date)
            const qd = await getDoc(closeRef);
            if (qd.exists()) {
                this.callendarMessage = "We are closed this day due to " + qd.data().reason;
                this.timeSlots = [];
                return;
            }
            this.slotInit();
        },
        async slotInit() {
            this.timeSlots = [];
            // Pull open hours from firebase
            const hoursDoc: DocumentReference = doc(db, 'businessHours', this.selectedDate.getDay().toString());
            await getDoc(hoursDoc).then((qd: DocumentSnapshot) => {
                if (qd.exists()) {
                    this.hours = qd.data() as hourType;
                }
                else {
                    console.log("Failed to pull hours from firebase")
                    return;
                }
            });
            // Pull bookings for the selected day
            const bookingRef = doc(db, "bookingsByDate", this.date);
            if (this.bookingUnsubscribe) {
                this.bookingUnsubscribe();
                this.bookingUnsubscribe = null;
            }
            this.timeSlots = [];
            this.bookingUnsubscribe = onSnapshot(bookingRef, (snapshot) => {
                const bookingData = snapshot.exists()
                    ? snapshot.data()?.hours ?? {}
                    : {};
                const newSlots = [] as slotType[];
                // Fill in timeslots with empty or pulled bookings
                for (let hour = this.hours.start; hour < this.hours.end; hour++) {
                    for (const area of this.areas) {
                        newSlots.push({
                            hour,
                            name: area.name,
                            type: area.type,
                            currentCapacity: bookingData?.[hour.toString()]?.[area.name]?.dogCount ?? 0,
                            maxCapacity: area.capacity
                        });
                    }
                }
                this.timeSlots = newSlots;
            })
        },
        formatHour(hour: number): string {
            const suffix = hour >= 12 ? "PM" : "AM"
            const formatted = hour % 12 || 12
            return `${formatted.toString().padStart(2, " ")}:00 ${suffix}`
        },
        checkBooking(user: string | undefined) {
            const availableSpace = this.selectedSlot.maxCapacity - this.selectedSlot.currentCapacity;
            if(!user) {
                this.errorMessage = "Must be logged in to book a time"
                this.showError = true;
                return;
            }
            else if(availableSpace <= 0) {
                this.errorMessage = "This session is full, select another."
                this.showError = true;
                return;
            }
            else if((availableSpace - this.selectedDogId.length) <= 0) {
                this.errorMessage = "Too many dogs selected, please pick another slot or take a dog off."
                this.showError = true;
                return;
            }
            this.booking = true;
        },
        async addBooking(user: userType) {
            const bookingRef = doc(db, "bookingsByDate", this.date);
            const hourKey = String(this.selectedSlot.hour);
            const areaKey = this.selectedSlot.name;
            try {
                await updateDoc(bookingRef, {
                    [`hours.${hourKey}.${areaKey}.dogCount`]: increment(this.selectedDogId.length),

                    [`hours.${hourKey}.${areaKey}.dogId`]: arrayUnion(...this.selectedDogId),

                    [`hours.${hourKey}.${areaKey}.userId`]: arrayUnion(user.userId)
                });
            } catch (err) {
                await setDoc(bookingRef, {
                    hours: {
                        [hourKey]: {
                            [areaKey]: {
                                dogCount: this.selectedDogId.length,
                                dogId: this.selectedDogId,
                                userId: [user.userId]
                            }
                        }
                    }
                }, { merge: true });
            }
            
            const userBookingRef = collection(db, "userBookings", user.userId, "bookings");
            await addDoc(userBookingRef, 
                {date: this.date, 
                time: this.selectedSlot.hour, 
                dogs: this.selectedDogId,
                area: this.selectedSlot.name})
            this.booking = false;
            this.selectedDogId = [];
        },
        checkUserDogs(dogs: dogType[]): dogType[] {
            if (dogs.length == 0) {
                this.errorMessage = "No dogs are assigned to your account"
                this.showError = true;
                this.booking = false;
                return dogs;
            }
            const vacList = dogs.filter(dog => dog.vaccinated);
            if (vacList.length == 0) {
                this.errorMessage = "Dogs vaccination must be approved before booking a slot"
                this.showError = true;
                this.booking = false;
                return [];
            }
            return vacList;
        }
    }
});