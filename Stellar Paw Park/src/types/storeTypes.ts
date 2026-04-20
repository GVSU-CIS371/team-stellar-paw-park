interface dogType {
    ownerId: string;
    name: string;
    image: File;
    breed: string;
    color: string;
    DOB: string;
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