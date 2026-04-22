import { Timestamp } from "firebase/firestore";

interface dogType {
    ownerId: string;
    name: string;
    image: File;
    breed: string;
    color: string;
    DOB: Timestamp;
    vaccinated: boolean;
    vaccinationImg: File;
} 

interface userType {
    userId: string;
    name: string;
    email: string;
    phone: string;
    admin: boolean;
}

export type { userType, dogType };