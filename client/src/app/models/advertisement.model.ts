export enum Gender { Male, Female, DoesNotMatter }
export enum MilitaryStatus { NotRequired, ServedOrExempted, EducationalExemption }
export enum EmploymentType { FullTime, PartTime, Contract, Internship, Temporary }
export enum ExperienceLevel { Entry, Junior, Mid, Senior, Lead, Manager }
export enum EducationLevel { NotRequired, Diploma, Associate, Bachelor, Master, Doctorate }
export enum JobStatus { Draft, Published, Closed, Archived }

export interface Advertisement {
    // id?: string;
    // creatorId?: string; // چرا باید حذف بشه
    companyName: string;
    companyEmail: string;
    jobTitle: string;
    shortDescription?: string;
    details: string;
    category: string;
    gender: Gender;
    militaryServiceRequired: MilitaryStatus;
    isUrgent: boolean;
    location: string;
    logoUrl: string;
    isRemote: boolean;
    employmentType: EmploymentType;
    experienceLevel?: ExperienceLevel;
    educationLevel?: EducationLevel;
    minSalary?: number;
    maxSalary?: number;
    skills?: string[];
    benefits?: string[];
    expiryDate?: Date;
    // createdAt?: Date;
    status: JobStatus;
}