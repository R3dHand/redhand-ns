import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchResultFood } from '../../models/usda/search-result-food.model';
import { UsdaSearchService } from '../../services/usda/usda-search.service';
import { SearchResultModel } from '../../models/usda/search-result.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    resultsList = [] as SearchResultFood[];
    resultsLoaded: boolean = false;
    selectedResult = {} as SearchResultFood;

    constructor(
        private usdaSearchService: UsdaSearchService
    ) {

    }

    ngOnInit(): void {
        this.usdaSearchService.searchResults$.pipe(takeUntil(this.destroy$)).subscribe(
            result => this.handleSearchResult(result)
        );
    }

    handleSearchResult(searchResult: SearchResultModel) {
        this.resultsList = searchResult.foods;

        if (this.resultsList.length > 0) {
            this.selectedResult = this.resultsList[0];
            this.resultsLoaded = true;
        } else {
            this.resultsLoaded = false;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
