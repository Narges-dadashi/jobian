export interface LoggedIn {
    email?: string;
    companyEmail?: string;
    userName?: string;
    companyName?: string;
    token: string;
    profilePhotoUrl: string | undefined;
}