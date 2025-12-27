import { EmploymentType, ExperienceLevel, JobStatus } from './advertisement.model';

export interface AdvertisementResponse {
    title: string;
    shortDescription?: string;
    details: string;
    creatorUserName: string;
    companyEmail: string;
    location: string;
    isRemote: boolean;
    employmentType: EmploymentType;
    experienceLevel?: ExperienceLevel;
    educationLevel: string;
    salaryFrom?: number;
    salaryTo?: number;
    skills?: string[];
    benefits?: string[];
    expiryDate?: Date | string;
    status: JobStatus;
}