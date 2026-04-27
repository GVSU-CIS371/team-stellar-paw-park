import { defineStore } from 'pinia'
import { messageType } from '../types/storeTypes'
import db from '../firebase'
import { 
    collection,
    CollectionReference,
    addDoc
} from 'firebase/firestore';

export const useContactStore = defineStore('ContactStore', {
    state: () => ({
        message: {} as messageType,
    }),
    actions: {
        submitForm() {
            const contactColl: CollectionReference = collection(db, 'contactForms');
            this.message.date = this.formatDate();
            addDoc(contactColl, this.message);
            this.message = {} as messageType;
        },
        formatDate() {
            const date = new Date()
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return (year.toString() + "-" + month.toString() + "-" + day.toString());
        }
    }
})