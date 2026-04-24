import { defineStore } from 'pinia'
import { userType, dogType } from '../types/storeTypes'
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
} from 'firebase/firestore';

export const useAdminStore = defineStore('AdminStore', {
    state: () => ({
        verifyVaccination: [] as dogType[],
        dogListener: null as (() => void) | null,
        headers: [
            {title: "Name", key: 'name'},
            {title: "Breed", key: 'breed'},
            {title: "Color", key: 'color'},
            {title: "DOB", key: 'DOB'},
            {title: "Vaccination Status", key: 'vaccinated'},
            {title: "Vaccination Form", key: 'vaccinationImg'},
            {title: "Approve", key: 'actions', sortable: false},
        ]
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
                for (let change of s.docChanges()) {
                    const dogData = change.doc.data() as dogType;
                    if (change.type === 'added') {
                        this.verifyVaccination.push({...dogData, id: change.doc.id})
                    }
                    else if (change.type === 'removed'){
                        this.verifyVaccination = this.verifyVaccination.filter((i) => i.id !== dogData.id)
                    }
                }
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
        }
    },
});