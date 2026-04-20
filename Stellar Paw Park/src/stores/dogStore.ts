import { defineStore } from 'pinia'
import { userType, dogType } from '../types/storeTypes'
import db from '../firebase'
import { addDoc, collection, CollectionReference, doc, DocumentReference, updateDoc } from 'firebase/firestore';

export const useDogStore = defineStore('DogStore', {
    state: () => ({
        dog: {} as dogType,
        dogInfo: false,
    }),
    actions: {
        addDog(owner: string) {
            this.dog.ownerId = owner;
            const dogColl: CollectionReference = collection(db, 'dogs');
            addDoc(dogColl, this.dog)
                .then(() => { 
                    console.log("Dog added successfully!");
                    this.dogInfo = false;
                    this.dog = {} as dogType;
                })
                .catch((error) => {
                    console.error("Error adding dog: ", error);
                });
        }
    },
})