import { Photo } from "./photo.model";

export interface Member {
    email?: string;
    companyEmail?: string;
    userName?: string;
    companyName?: string;
    photos: Photo[];
}