import { defineStore } from 'pinia'
import { 
    User,
    GoogleAuthProvider, 
    signInWithPopup, 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vue-router';
import { useUserStore } from './userStore';


export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        signUp: false,
        user: null as User | null,
        authListener: null as (() => void) | null,
        email: "",
        password1: "",
        password2: "",
        fname: "",
        lname: "",
        message: "",
    }),
    actions: {
        authListenerInit() {
            if (this.authListener) return;

            const router = useRouter();

            this.authListener = onAuthStateChanged(auth, (user) => {
                this.user = user;

                const userStore = useUserStore();
                userStore.clearUser();

                if (user) {
                    userStore.setUser(user);
                    router.push('/userPage');
                }
                else {
                    userStore.clearUser();
                    if (router.currentRoute.value.path === '/userPage') {
                        router.push('/');
                    }
                }
            })
        },
        loginWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    this.message = "Google login successful!";
                    this.reset();
                })
                .catch((error) => {
                    this.message = "Google login failed. Please try again.";
                });
        },
        loginWithEmail() {
            signInWithEmailAndPassword(getAuth(), this.email, this.password1)
                .then((userCredential) => {
                    this.message = "Login successful!";
                    this.reset();
                })
                .catch((error) => {
                    this.message = "Login failed. Please check your credentials.";
                });
        },
        registerWithEmail() {
            if (!this.password1 || !this.password2 || !this.email || !this.fname || !this.lname) {
                this.message = "Please fill in all fields.";
                return;
            }
            if (this.password1 !== this.password2) {
                this.message = "Passwords do not match. Please try again.";
                return;
            }

            createUserWithEmailAndPassword(getAuth(), this.email, this.password1)
                .then(async (result) => {
                    this.message = "Registration successful";
                    this.signUp = false;
                    this.reset();
                })
                .catch((error) => {
                    this.message = "Failed to register. Try logging in.";
                });
        },
        async signOut() {
            this.reset();
            await signOut(auth);
        },
        reset() {
            this.email = "";
            this.password1 = "";
            this.password2 = "";
        }
    },
})