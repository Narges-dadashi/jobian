import { Photo } from "./photo.model";

export interface User {
    email: string;
    userName: string;
    age: number;
    lastActive: Date;
    gender: string;
    photos: Photo[];
}