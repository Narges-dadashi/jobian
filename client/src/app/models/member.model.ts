import { Photo } from "./photo.model";

export interface Member {
    email: string;
    userName: string;
    photos: Photo[];
}