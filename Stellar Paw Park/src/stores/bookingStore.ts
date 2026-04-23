import { defineStore } from 'pinia'
import { userType, areaType, hourType, slotType } from '../types/storeTypes'
import { watch } from 'vue'
import db from '../firebase'
import { 
    addDoc, 
    collection, 
    CollectionReference, 
    doc,
    getDoc,
    getDocs, 
    deleteDoc, 
    updateDoc,
    query,
    where,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentReference,
    DocumentSnapshot
} from 'firebase/firestore';

export const useBookingStore = defineStore('BookingStore', {
    state: () => ({ 
        areas: [] as areaType[],
        timeSlots: [] as slotType[],
        selectedSlot: {} as slotType,
        selectedDogs: [],
        booking: false,
        date: new Date,
        hours: {} as hourType,
        user: "",
    }),
    actions: {
        async dateSelected() {
            this.timeSlots = [];
            this.areas = [];
            console.log(this.date);
            this.slotInit();
        },
        async slotInit() {
            // Get the day of the week as an int and pull hours from firebase
            const selectedDay = this.date.getDay().toString();
            const hoursDoc: DocumentReference = doc(db, 'businessHours', selectedDay);
            await getDoc(hoursDoc).then((qd: DocumentSnapshot) => {
                if (qd.exists()) {
                    this.hours = qd.data() as hourType;
                }
                else {
                    console.log("Failed to pull hours from firebase")
                    return;
                }
            });
            const areasSnapshot = await getDocs(collection(db, 'areas'));
            this.areas = areasSnapshot.docs.map(doc => ({
                name:doc.id, 
                ...(doc.data() as Omit<areaType, "name">)
            }))
            for (let hour = this.hours.start; hour < this.hours.end; hour++) {
                for (const area of this.areas) {
                    this.timeSlots.push({
                        hour,
                        name: area.name,
                        type: area.type,
                        currentCapacity: 0,
                        maxCapacity: area.capacity
                    })
                }
            }
        },
        formatHour(hour: number): string {
            const suffix = hour >= 12 ? "PM" : "AM"
            const formatted = hour % 12 || 12
            return `${formatted.toString().padStart(2, " ")}:00 ${suffix}`
        },
        addBooking() {
            const bookingColl: CollectionReference = collection(db, 'bookings');
            addDoc(bookingColl, {user: this.user, date: this.date, area: this.selectedSlot.type, dogs: this.selectedDogs})
                .then(() => {
                    console.log("Booking successfully added.")
                })
                .catch(() => {
                    console.log("Failed booking creation.")
                })
            this.selectedSlot = {} as slotType;
            this.selectedDogs = [];
            this.booking = false;
        },
        setupBooking(slot: slotType, user: string) {
            if (!user) {
                return;
            }
            else {
                this.user = user;
            }
            this.selectedSlot = slot;
            this.booking = true;
        }
    }
});