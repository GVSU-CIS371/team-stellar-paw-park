import { defineStore } from 'pinia'
import db from '../firebase'
import { 
    collection, 
    doc,
    CollectionReference,
    addDoc
} from 'firebase/firestore';

export const useContactStore = defineStore('ContactStore', {
    state: () => ({
        name: "",
        email: "",
        phone: "",
        message: "",
    }),
    actions: {
        submitForm() {
            const contactColl: CollectionReference = collection(db, 'contactForms');
            const contactData = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                message: this.message,
                timestamp: new Date(),
            };
            addDoc(contactColl, contactData)
                .then(() => {
                    console.log("Contact form submitted successfully!");
                    this.name = "";
                    this.email = "";
                    this.phone = "";
                    this.message = "";
                })
                .catch((error) => {
                    console.error("Error submitting contact form: ", error);
                });

        }
    }
})