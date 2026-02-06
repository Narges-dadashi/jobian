import { Photo } from "./photo.model";

export interface JobSeeker {
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    resumeFileUrl?: string;
    bio: string;
    skills: string[];
    educationLevel: string;
    experienceYears: number;
    location: string;
    province: string;
    photos: Photo[];
}