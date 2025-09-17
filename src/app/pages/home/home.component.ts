import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserComponent } from '../../components/browser/browser.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';

@Component({
    selector: 'app-home',
    imports: [
        BrowserComponent,
        SearchResultsComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

    constructor (
    ) {
        
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}
