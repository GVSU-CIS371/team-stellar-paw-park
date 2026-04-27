import { defineStore } from 'pinia'
import { dogType, messageType } from '../types/storeTypes'
import db from '../firebase'
import {  
    QuerySnapshot, 
    collection,
    CollectionReference, 
    doc, 
    getDocs, 
    updateDoc,
    query,  
    where,
    onSnapshot,
    QueryDocumentSnapshot,
    deleteDoc,
    DocumentReference,
    getDoc,
} from 'firebase/firestore';

export const useAdminStore = defineStore('AdminStore', {
    state: () => ({
        dogListener: null as (() => void) | null,
        verifyVaccination: [] as dogType[],
        dogHeaders: [
            {title: "Name", key: 'name'},
            {title: "Breed", key: 'breed'},
            {title: "Color", key: 'color'},
            {title: "DOB", key: 'DOB'},
            {title: "Vaccination Status", key: 'vaccinated'},
            {title: "Vaccination Form", key: 'vaccinationImg'},
            {title: "Approve", key: 'actions', sortable: false},
        ],
        messageListener: null as (() => void) | null,
        messages: [] as messageType[],
        messageHeaders: [
            {title: "Date", key: 'date'},
            {title: "Name", key: 'name'},
            {title: "Email", key: 'email'},
            {title: "Phone #", key: 'phone'},
            {title: "Delete", key: 'actions', sortable: false}
        ],
        bookingDate: new Date,
        bookingsList: [] as any,
    }),
    actions: {
        initDogListener() {
            this.verifyVaccination = [];
            if (this.dogListener) {
                this.dogListener();
                this.dogListener = null;
            }

            const dogColl = query(collection(db, 'dogs'), where('vaccinated', '==', false ));
            this.dogListener = onSnapshot(dogColl, async (s: QuerySnapshot) => {
                this.verifyVaccination = s.docs.map(doc => {
                    const dogData = doc.data();
                    return ({...dogData as dogType, id:doc.id})
                })
            })
        },
        updateVaccination(dog: dogType) {
            const dogColl: CollectionReference = collection(db, 'dogs');
            const qr = query(dogColl, where("id", "==", dog.id));
            getDocs(qr).then((qs: QuerySnapshot) => {
                qs.forEach(async (qd: QueryDocumentSnapshot) => {
                    const dogDoc = doc(db, 'dogs', qd.id);
                    await updateDoc(dogDoc, {vaccinated: true})
                })
            })
        },
        initMessageListener() {
            this.verifyVaccination = [];
            if (this.messageListener) {
                this.messageListener();
                this.messageListener = null;
            }

            const messageColl = query(collection(db, 'contactForms'));
            this.messageListener = onSnapshot(messageColl, async (s: QuerySnapshot) => {
                this.messages = s.docs.map(doc => {
                    const messageData = doc.data() as messageType;
                    return ({...messageData as messageType, id:doc.id})
                })
            })
        },
        async deleteMessage(id: string) {
            const messDoc = doc(db, "contactForms", id);
            await deleteDoc(messDoc);
        },
        async pullBookings() {
            this.bookingsList = [];
            const day = this.bookingDate.getDate();
            const month = this.bookingDate.getMonth() + 1;
            const year = this.bookingDate.getFullYear();
            const date = year.toString() + "-" + month.toString() + "-" + day.toString();
            console.log(date);

            const bookingDoc: DocumentReference = doc(db, 'bookingsByDate', date);
            const qd = await getDoc(bookingDoc);
            if (!qd.exists()) {
                this.bookingsList = [];
            }
            else {
                const bookingData = qd.data().hours as any;
                for (const hour in bookingData) {
                    const areas = bookingData[hour];
                    const newHour = Number(hour)
                    for (const area in areas) {
                        const data = areas[area];
                        this.bookingsList.push({
                            Time: this.formatHour(newHour),
                            Area: area,
                            Amount: data.dogCount
                        })
                    }
                }
            }
            console.log(this.bookingsList)
        },
        formatHour(hour: number): string {
            const suffix = hour >= 12 ? "PM" : "AM"
            const formatted = hour % 12 || 12
            return `${formatted.toString().padStart(2, " ")}:00 ${suffix}`
        },
    },
});