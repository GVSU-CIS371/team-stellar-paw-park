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
interface bookingType {
    [area: string]: number
}

interface areaType {
    name: string;
    capacity: number;
    type: string;
}

interface hourType {
    start: number;
    end: number;
}

interface slotType {
    hour: number;
    name: string;
    currentCapacity: number;
    maxCapacity: number;
    type: string;
}

export type { userType, dogType, bookingType, areaType, hourType, slotType };