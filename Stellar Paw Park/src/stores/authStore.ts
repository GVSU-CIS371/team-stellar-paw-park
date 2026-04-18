import { defineStore } from 'pinia'
import { appUser } from '../types/storeTypes'
import db from '../firebase'
import { DocumentReference, setDoc, doc, getDoc, DocumentSnapshot } from 'firebase/firestore'
import { User } from 'firebase/auth'

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        user: null as User | null,
        userData: null as appUser | null,
        email: "",
        password: "",
        message: "",
    }),
    actions: {
        setUser(user: User | null) {
            this.user = user;
            if (user) {
                const userDoc: DocumentReference = doc(db, 'users', user.uid);
                getDoc(userDoc).then((qd: DocumentSnapshot) => {
                    this.userData = qd.data() as appUser;
                })
            }
            else {
                this.userData = null;
            }
        },
        createUserData(user: User) {
            const userDoc: DocumentReference = doc(db, 'users', user.uid);
            setDoc(userDoc, {
                fname: user.displayName?.split(' ')[0] || '',
                lname: user.displayName?.split(' ')[1] || '',
                email: user.email || '',
                phone: '',
                admin: false
            }).then(() => {
                console.log('User data created successfully');
            }).catch((error) => {
                console.error('Error creating user data:', error);
            });
        },
    },
})