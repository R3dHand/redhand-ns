import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodDataCentralService } from '../../services/ns-api/food-data-central.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
    helloWorld: string = '';
    helloWorldSub: any;

    constructor (
        private fdcService: FoodDataCentralService
    ) {
        
    }

    ngOnInit(): void {
        this.helloWorldSub = this.fdcService.helloWorld().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }

    ngOnDestroy(): void {
        this.helloWorldSub.unsubscribe();
    }

    handleResponse(res: string) {
        if (res === undefined || res === null || res === ''){
            this.helloWorld = 'failed';
        } else {
            this.helloWorld = res;
        }
    }
    
    handleError (error: HttpErrorResponse) {
        this.helloWorld = error.message;
    }


}
