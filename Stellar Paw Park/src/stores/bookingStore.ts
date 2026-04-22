import { defineStore } from 'pinia'
import { bookingType, areaType, hourType, slotType } from '../types/storeTypes'
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
        date: new Date,
        hours: {} as hourType,
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
        addBooking(user: string, slot: slotType) {
            const bookingColl: CollectionReference = collection(db, 'bookings');
            addDoc(bookingColl, {user: user, slot})
                .then(() => {
                    console.log("Booking successfully added.")
                })
                .catch(() => {
                    console.log("Failed booking creation.")
                })
        }
    }
});