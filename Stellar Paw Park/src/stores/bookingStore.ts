import { defineStore } from 'pinia'
import { areaType, hourType, slotType } from '../types/storeTypes'
import db from '../firebase'
import { 
    addDoc, 
    collection, 
    CollectionReference, 
    doc,
    getDoc,
    getDocs,
    Query,
    query,
    where,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentReference,
    DocumentSnapshot,
    Timestamp,
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
        bookedHours: {} as Record<string, number>,
        errorMessage: '',
        callendarMessage: '',
    }),
    actions: {
        async dateSelected() {
            this.timeSlots = [];
            this.areas = [];
            if (this.checkSelectedDate()) {
                this.callendarMessage = "Unable to view past bookings, please select another day."
                return;
            }
            this.slotInit();
        },
        async slotInit() {
            // Check if closed on day selected and update error message
            const startOfDay = new Date (this.date.setHours(0,0,0,0));
            const endOfDay = new Date(this.date.setHours(23,59,59,999));
            const getClose: Query = query(collection(db, "closures"), 
                where("day", ">=", Timestamp.fromDate(startOfDay)),
                where("day", "<=", Timestamp.fromDate(endOfDay)));
            const qs = await getDocs(getClose);
            if (!qs.empty) {
                const qd = qs.docs[0];
                this.callendarMessage = "We are closed this day due to " + qd?.data().reason;
                return;
            }
            
            // Get the day of the week as an int and pull hours from firebase
            const selectedDay = this.date.getDay().toString();
            if (this.date.getDay() === 0) {
                this.callendarMessage = "We are closed on Sundays, please select another day.";
                return;
            }
            this.callendarMessage = '';
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
                this.bookedHours = {} as Record<string, number>;
                await this.checkBookings(hour);
                for (const area of this.areas) {
                    this.timeSlots.push({
                        hour,
                        name: area.name,
                        type: area.type,
                        currentCapacity: this.bookedHours[area.name]?? 0,
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
        checkSelectedDate() {
            const todaysDate = new Date();

            const today = new Date(
                todaysDate.getFullYear(),
                todaysDate.getMonth(),
                todaysDate.getDate(),
            )

            const selectedDate = new Date(
                this.date.getFullYear(),
                this.date.getMonth(),
                this.date.getDate()
            )

            return selectedDate < today
        },
        async checkBookings(hour: number) {
            const getHourColl: Query = query( collection(db, "bookings"), where("hour", "==", hour), where("date", "==", this.date));
            await getDocs(getHourColl).then((qs: QuerySnapshot) => {
                qs.forEach((qd: QueryDocumentSnapshot) => {
                    const bookData = qd.data();
                    if (bookData.area in this.bookedHours) {
                        this.bookedHours[bookData.area] += bookData.dogs.length;
                    }
                    else {
                        this.bookedHours[bookData.area] = bookData.dogs.length;
                    }
                })
            })
        },
        addBooking() {
            const capacityRemaining = this.selectedSlot.maxCapacity - this.selectedSlot.currentCapacity;
            if (this.selectedSlot.type === "private" && this.selectedSlot.currentCapacity !== 0) {
                this.errorMessage = "This session is already booked, pick another time slot.";
                return;
            }
            else if ((capacityRemaining - this.selectedDogs.length) < 0 && this.selectedSlot.type !== "private") {
                this.errorMessage = "Not enough space remaining, pick another time slot.";
                return;
            }

            const bookingColl: CollectionReference = collection(db, 'bookings');
            addDoc(bookingColl, {user: this.user, date: this.date, hour: this.selectedSlot.hour ,area: this.selectedSlot.name, dogs: this.selectedDogs})
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