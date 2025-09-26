import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchResultFood } from '../../models/usda/search-result-food.model';
import { UsdaSearchService } from '../../services/usda/usda-search.service';
import { SearchResultModel } from '../../models/usda/search-result.model';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnChanges {
    @Input() searchResults = {} as SearchResultModel;
    resultsList = [] as SearchResultFood[];
    selectedResult = {} as SearchResultFood;
    selectedResultIndex: number = 0;
    resultsLoaded: boolean = false;

    constructor(
        private usdaSearchService: UsdaSearchService
    ) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (Object.entries(changes['searchResults'].currentValue).length > 0) {
            this.resultsList = this.searchResults.foods;
            this.selectedResult = this.resultsList[0];
            this.selectedResultIndex = this.resultsList.indexOf(this.selectedResult);
            this.resultsLoaded = true;
        } else {
            this.searchResults = {} as SearchResultModel;
            this.selectedResult = {} as SearchResultFood;
            this.selectedResultIndex = 0;
            this.resultsLoaded = false;
        }
    }

    setSelectedResult(selectedResultIndex: number) {
        this.selectedResultIndex = selectedResultIndex;
        this.selectedResult = this.resultsList[this.selectedResultIndex];

    }
}
