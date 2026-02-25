import { EducationLevel, EmploymentType, ExperienceLevel, Gender, JobStatus, MilitaryStatus } from './advertisement.model';

export interface AdvertisementResponse {
    creatorUserName: string;
    companyEmail: string;
    jobTitle: string;
    shortDescription?: string;
    details: string;
    category: string;
    gender: Gender;
    militaryServiceRequired: MilitaryStatus;
    isUrgent: boolean;
    location: string;
    logoUrl?: string;
    isRemote: boolean;
    employmentType: EmploymentType;
    experienceLevel?: ExperienceLevel;
    educationLevel: EducationLevel;
    minSalary?: number;
    maxSalary?: number;
    skills?: string[];
    benefits?: string[];
    expiryDate?: Date | string;
    createdAt: Date | string;
    status: JobStatus;
}