
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserPreferences } from '../models/user-preferences.model';

@Injectable({
    providedIn: 'root'
})
export class UserPreferencesService {
    preferences$: Subject<UserPreferences> = new Subject<UserPreferences>();
    constructor(
        private httpClient: HttpClient
    ) { }

    preferences(): Observable<UserPreferences> {
        return this.httpClient.get<UserPreferences>(`http://localhost:3000/preferences`);
    }
    updatePreferences(preferences: UserPreferences): Observable<UserPreferences> {
        return this.httpClient.patch<UserPreferences>(`http://localhost:3000/preferences`, preferences);
    }
}
