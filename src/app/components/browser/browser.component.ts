import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FoodSearchCriteriaModel } from '../../models/usda/food-search-criteria.model';
import { DataTypesModel } from '../../models/usda/data-types.model';
import { TradeChannelsModel } from '../../models/usda/trade-channels.model';
import { SortOrderModel } from '../../models/usda/sort-order.model';
import { SortByModel } from '../../models/usda/sort-by.model';
import { UsdaSearchService } from '../../services/usda/usda-search.service';
import { SearchResultModel } from '../../models/usda/search-result.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleSelectComponent } from '../form-controls/single-select/single-select.component';
import { MultiSelectComponent } from '../form-controls/multi-select/multi-select.component';

@Component({
    selector: 'app-browser',
    imports: [
        ReactiveFormsModule,
        SingleSelectComponent,
        MultiSelectComponent
    ],
    templateUrl: './browser.component.html',
    styleUrl: './browser.component.scss'
})
export class BrowserComponent implements OnInit{
    queryForm: FormGroup = new FormGroup({
        query: new FormControl<string>('')
    });

    showSearchCriteria: boolean = true;
    
    searchCriteria = new FoodSearchCriteriaModel('');
    dataTypes = new DataTypesModel();
    tradeChannels = new TradeChannelsModel();
    sortOrder = new SortOrderModel();
    sortBy = new SortByModel();
    searchCriteriaForm: FormGroup = new FormGroup({
        selectedDataTypes: new FormControl<string[]>([]),
        pageSize: new FormControl<number|null>(50),
        pageNumber: new FormControl<number|null>(1),
        selectedSortBy: new FormControl<string|null>({ value: null, disabled: false}),
        selectedSortOrder: new FormControl<string|null>(null),
        brandOwner: new FormControl<string|null>(null),
        selectedTradeChannels: new FormControl<string[]>([]),
        startDate: new FormControl<string|null>(null),
        endDate: new FormControl<string|null>(null)
    });

    constructor (
        private usdaSearchService: UsdaSearchService
    ) {

    }

    ngOnInit(): void {
        var test = '';
    }

    search() {
        const searchCriteria = {...this.queryForm.value, ...this.searchCriteriaForm.value} as FoodSearchCriteriaModel
        var test = '';

        // this.usdaSearchService.search(searchCriteria).subscribe({
        //     next: this.handleSearchResult.bind(this),
        //     error: this.handleError.bind(this)
        // });
    }

    handleSearchResult(searchResult: SearchResultModel) {
        var test = '';
    }
    handleError(errorResponse: HttpErrorResponse) {

    }
}
