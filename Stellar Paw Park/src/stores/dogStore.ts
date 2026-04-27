import { defineStore } from 'pinia'
import { dogType } from '../types/storeTypes'
import db from '../firebase'
import { 
    addDoc, 
    collection, 
    CollectionReference, 
    doc,
    deleteDoc, 
    updateDoc,
    DocumentReference
} from 'firebase/firestore';
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL,
    deleteObject
 } from 'firebase/storage';
const storage = getStorage();

export const useDogStore = defineStore('DogStore', {
    state: () => ({
        updating: false,
        dog: {} as dogType,
        imgFile: null as File | null,
        vacFile: null as File | null,
        newDogInfo: false,
        editDogInfo: false,
        deleteDogInfo: false,
        dogToDelete: {} as dogType,
    }),
    actions: {
        async addDog(owner: string) {
            this.updating = true;
            this.dog.ownerId = owner;
            this.dog.vaccinated = false;

            const dogColl: CollectionReference = collection(db, 'dogs');
            const dogRef = await addDoc(dogColl, this.dog);

            this.dog.id = dogRef.id;
            let imgData = null;
            let vacData = null;

            if (this.imgFile){
                const path = `dogs/${dogRef.id}/img/${Date.now()}_${this.dog.name}`
                imgData = await this.uploadImage(this.imgFile, path);
            }
            if (this.vacFile) {
                const path = `dogs/${dogRef.id}/vac/${Date.now()}_${this.dog.name}`
                vacData = await this.uploadImage(this.vacFile, path);
            }
            await updateDoc(doc(db, 'dogs', this.dog.id), {
                id: this.dog.id,
                image: imgData,
                vaccinationImg: vacData,
            })
            this.newDogInfo = false;
            this.dog = {} as dogType;
            this.imgFile = null;
            this.vacFile = null;
            this.updating = false;
        },
        async editDog() {
            this.updating = true;
            const dogRef: DocumentReference = doc(db, "dogs", this.dog.id);
            let imgData = undefined;
            let vacData = undefined;

            const updateData: any = {
                name: this.dog.name ?? undefined,
                color: this.dog.color ?? undefined,
                breed: this.dog.breed ?? undefined,
                DOB: this.dog.DOB ?? undefined,
            }

            if (this.imgFile){
                if (this.dog.image) {
                    await this.deleteImage(this.dog.image.path);
                }
                const path = `dogs/${dogRef.id}/img/${Date.now()}_${this.dog.name}`
                imgData = await this.uploadImage(this.imgFile, path);
                updateData.image = imgData; 
            }
            if (this.vacFile) {
                if (this.dog.vaccinationImg) {
                    await this.deleteImage(this.dog.vaccinationImg.path);
                }
                const path = `dogs/${dogRef.id}/vac/${Date.now()}_${this.dog.name}`
                vacData = await this.uploadImage(this.vacFile, path);
                updateData.vaccinationImg = vacData;
            }

            await updateDoc(dogRef, updateData)

            this.dog = {} as dogType;
            this.imgFile = null;
            this.vacFile = null
            this.editDogInfo = false;
            this.updating = false;
        },
        async deleteDog() {
            this.updating = true;
            if (this.dog.image) {
                await this.deleteImage(this.dog.image.path);
            }
            if (this.dog.vaccinationImg) {
                await this.deleteImage(this.dog.vaccinationImg.path);
            }
            await deleteDoc(doc(db, "dogs", this.dog.id));
            this.dog = {} as dogType;
            this.updating = false;
        },
        async uploadImage(file: File, path:string){
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return {url, path};
        },
        async deleteImage(path: string) {
            const storageRef = ref(storage, path);
            await deleteObject(storageRef);
        }
    },
})