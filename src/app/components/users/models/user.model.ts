export class UserModel {
    isAuthenticated: boolean;

    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    userName: string | undefined;

    avatarInitials: string | undefined;

    constructor (isAuthenticated: boolean) {
        this.isAuthenticated = false;
    }
}