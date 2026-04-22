import { defineStore } from 'pinia'
import db from '../firebase'
import { 
    addDoc, 
    collection, 
    CollectionReference, 
    doc,
    getDocs, 
    deleteDoc, 
    updateDoc,
    query,
    where,
    QuerySnapshot,
    QueryDocumentSnapshot
} from 'firebase/firestore';

export const useBookingStore = defineStore('BookingStore', {
    state: () => ({ 

    }),
    actions: {
        
    }
});