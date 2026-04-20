import { defineStore } from 'pinia'
import { userType, dogType } from '../types/storeTypes'
import db, { auth } from '../firebase'
import { 
    DocumentReference, 
    QuerySnapshot, 
    collection, 
    doc, getDoc, 
    getDocs, 
    Query,
    query, 
    setDoc, 
    where } from 'firebase/firestore';
import { User } from '@firebase/auth';
import { useAuthStore } from './authStore';

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        loading: true,
        user: null as userType | null,
        dogs: [] as dogType[],
    }),
    actions: {
        async setUser(user: User) {
            this.loading = true;

            const userDoc: DocumentReference = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                this.user = userSnap.data() as userType;
                this.getDogs();
            }
            else {
                await this.createUser(user);
            }

            this.loading = false;
        },
        async createUser(user: User) {
            const authStore = useAuthStore();
            console.log(user);
            const newUser: userType = {
                userId: user.uid,
                name: user.displayName || authStore.fname + " " + authStore.lname || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                admin: false,
            };
            await setDoc(doc(db, 'users', user.uid), newUser);
            this.user = newUser;
        },
        clearUser() {
            this.user = null;
        },
        getDogs() {
            const getDogs: Query = query(collection(db, 'dogs'), where('ownerId', '==', this.user?.userId));
            getDocs(getDogs).then((qs: QuerySnapshot) => {
                this.dogs = qs.docs.map((doc) => doc.data() as dogType);
            }).catch((error) => {
                console.error("Error fetching dogs: ", error);
            });
        }
    },
})