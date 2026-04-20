interface userType {
    userId: string;
    name: string;
    email: string;
    phone: string;
    admin: boolean;
}

interface imageInfo {
    url: string;
    path: string;
}

interface dogType {
    dogId: number;
    ownerId: number;
    name: string;
    image: imageInfo;
    breed: string;
    color: string;
    DOB: string;
    vaccinated: boolean;
    vaccinationImg: imageInfo;
} 

export type { userType, dogType, imageInfo };