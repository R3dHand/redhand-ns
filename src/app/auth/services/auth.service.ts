import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Subject<UserModel> = new Subject<UserModel>();

    login$: Subject<void> = new Subject<void>();
    logout$: Subject<void> = new Subject<void>();

    constructor() { }
}
