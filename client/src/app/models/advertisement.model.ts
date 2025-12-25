export enum EmploymentType { FullTime, PartTime, Contract, Internship, Temporary }
export enum ExperienceLevel { Entry, Junior, Mid, Senior, Lead, Manager }
export enum JobStatus { Draft, Published, Closed, Archived }

export interface Advertisement {
    id?: string;
    creatorId?: string;
    companyName: string;
    companyEmail: string;
    title: string;
    shortDescription?: string;
    details: string;
    location: string;
    logoUrl: string;
    isRemote: boolean;
    employmentType: EmploymentType;
    experienceLevel?: ExperienceLevel;
    educationLevel?: string;
    salaryFrom?: number;
    salaryTo?: number;
    skills?: string[];
    benefits?: string[];
    expiryDate?: Date;
    status: JobStatus;
}