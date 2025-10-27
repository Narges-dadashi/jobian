import { Photo } from "./photo.model";

export interface Member {
    userName: string;
    age: number;
    photos: Photo[];
}