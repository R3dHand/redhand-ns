import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodDataCentralService {

    constructor(
        private httpClient: HttpClient
    )
    {

    }

    helloWorld(): Observable<string> {

        return this.httpClient.get(`http://localhost:3000`, {responseType: 'text'});
    }
}
