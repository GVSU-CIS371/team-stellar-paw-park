import { defineStore } from 'pinia'
import { dogType } from '../types/storeTypes'
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
    QueryDocumentSnapshot,
    DocumentReference
} from 'firebase/firestore';

export const useDogStore = defineStore('DogStore', {
    state: () => ({
        dog: {} as dogType,
        newDogInfo: false,
        editDogInfo: false,
        deleteDogInfo: false,
        dogToDelete: {} as dogType,
    }),
    actions: {
        async addDog(owner: string) {
            this.dog.ownerId = owner;
            this.dog.vaccinated = false;
            const dogColl: CollectionReference = collection(db, 'dogs');
            const dogRef = await addDoc(dogColl, this.dog);
            await updateDoc(dogRef, {id: dogRef.id})
                .then(() => { 
                    console.log("Dog added successfully!");
                    this.newDogInfo = false;
                    this.dog = {} as dogType;
                })
                .catch((error) => {
                    console.error("Error adding dog: ", error);
                });
        },
        async editDog() {
            const dogRef: DocumentReference = doc(db, "dogs", this.dog.id);
            await updateDoc(dogRef, this.dog)
            this.dog = {} as dogType;
            this.editDogInfo = false;
        },
        async deleteDog() {
            await deleteDoc(doc(db, "dogs", this.dog.id));
            this.dog = {} as dogType;
        }

    },
})