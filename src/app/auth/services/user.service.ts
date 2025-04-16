import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { UserPreferences } from '../models/user-preferences.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    preferences$: Subject<UserPreferences> = new Subject<UserPreferences>();
    constructor(
        private httpClient: HttpClient
    ) { }

    get(): Observable<UserModel[]> {
        return this.httpClient.get<UserModel[]>(`http://localhost:3000/users`);
    }
}
