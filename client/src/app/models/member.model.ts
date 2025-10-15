import { Photo } from "./photo.model";

export interface Member {
    email: string;
    userName: string;
    age: number;
    lastActive: Date;
    gender: string;
    photos: Photo[];
}