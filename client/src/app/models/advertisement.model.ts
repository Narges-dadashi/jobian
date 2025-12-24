export interface Advertisement {
    creatorId?: string;
    companyName: string;
    companyEmail: string;
    title: string;
    shortDescription?: string;
    details: string;
    location: string;
    logoUrl: string;
    isRemote: boolean;
    employmentType: string;
    experienceLevel?: string;
    educationLevel?: string;
    salaryFrom?: number;
    salaryTo?: number;
    skills?: string[];
    benefits?: string[];
    expiryDate?: Date;
    status: string;
}