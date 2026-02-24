import { EducationLevel } from "./advertisement.model";

export interface JobSeekerUpdate {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    resumeFileUrl: string;
    bio: string;
    skills: string[];
    educationLevel: EducationLevel;
    experienceYears: number;
    location: string;
    province: string;  
}