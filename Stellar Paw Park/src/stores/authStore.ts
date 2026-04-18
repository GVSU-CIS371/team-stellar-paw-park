import { defineStore } from 'pinia'
import { appUser } from '../types/storeTypes'
import db from '../firebase'
import { DocumentReference, setDoc, doc, getDoc, DocumentSnapshot } from 'firebase/firestore'
import { User } from 'firebase/auth'

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        signUp: false,
        user: null as User | null,
        userData: null as appUser | null,
        email: "",
        password1: "",
        password2: "",
        fname: "",
        lname: "",
        message: "",
    }),
    actions: {
        setUser(user: User | null) {
            this.user = user;
            if (user) {
                const userDoc: DocumentReference = doc(db, 'users', user.uid);
                getDoc(userDoc).then((qd: DocumentSnapshot) => {
                    if (qd.exists()) {
                        this.userData = qd.data() as appUser;
                    }
                    else {
                        this.createUserData(user);
                    }
                })
            }
            else {
                this.userData = null;
            }
        },
        createUserData(user: User) {
            const userDoc: DocumentReference = doc(db, 'users', user.uid);
            const userData: appUser = {
                userId: user.uid,
                fname: user.displayName?.split(' ')[0] || this.fname,
                lname: user.displayName?.split(' ')[1] || this.lname,
                email: user.email || this.email,
                phone: '',
                admin: false
            };
            setDoc(userDoc, {userData
            }).then(() => {
                console.log('User data created successfully');
            }).catch((error) => {
                console.error('Error creating user data:', error);
            });
        },
    },
})