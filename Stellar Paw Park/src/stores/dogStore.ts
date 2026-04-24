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
    QueryDocumentSnapshot
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
        addDog(owner: string) {
            this.dog.ownerId = owner;
            this.dog.vaccinated = false;
            const dogColl: CollectionReference = collection(db, 'dogs');
            addDoc(dogColl, this.dog)
                .then(() => { 
                    console.log("Dog added successfully!");
                    this.newDogInfo = false;
                    this.dog = {} as dogType;
                })
                .catch((error) => {
                    console.error("Error adding dog: ", error);
                });
        },
        editDog(owner: string) {
            const dogColl: CollectionReference = collection(db, 'dogs');
            const qr = query(dogColl, where("ownerId", "==", owner), where("name", "==", this.dog.name));
            getDocs(qr).then((qs: QuerySnapshot) => {
                qs.forEach(async (qd: QueryDocumentSnapshot) => {
                    const dogDoc = doc(db, 'dogs', qd.id);
                    await updateDoc(dogDoc, this.dog)
                })
            this.dog = {} as dogType;
            this.editDogInfo = false;
            })
        },
        deleteDog(dog: dogType) {
            const dogColl: CollectionReference = collection(db, 'dogs');
            const qr = query(dogColl, where("ownerId", "==", dog.ownerId), where("name", "==", dog.name));
            getDocs(qr).then((qs: QuerySnapshot) => {
                qs.forEach(async (qd: QueryDocumentSnapshot) => {
                    const dogDoc = doc(db, 'dogs', qd.id);
                    await deleteDoc(dogDoc)
                })
            })
        }

    },
})