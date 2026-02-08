import { Photo } from "./photo.model";

export interface Employer {
    userName: string;
    companyEmail: string;
    companyName: string;
    industry: string;
    companyPhoneNumber: string;
    contactPhoneNumber: string;
    about: string;
    logoUrl: string;
    contactPersonName: string;
    contactPersonPosition: string;
    location: string;
    province: string;
    photos: Photo[];
}