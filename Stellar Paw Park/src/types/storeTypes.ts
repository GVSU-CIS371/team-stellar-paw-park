interface appUser {
    userId: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    admin: boolean;
}

interface imageInfo {
    url: string;
    path: string;
}

interface dog {
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

export type { appUser, dog, imageInfo };