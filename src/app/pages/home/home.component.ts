import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FoodSearchCriteriaModel } from '../../models/usda/food-search-criteria.model';
import { DataTypesModel } from '../../models/usda/data-types.model';
import { TradeChannelsModel } from '../../models/usda/trade-channels.model';
import { SortOrderModel } from '../../models/usda/sort-order.model';
import { SortByModel } from '../../models/usda/sort-by.model';
import { InputNumericComponent } from '../../components/form-controls/input-numeric/input-numeric.component';
import { InputTextComponent } from '../../components/form-controls/input-text/input-text.component';
import { SearchComponent } from '../../components/form-controls/search/search.component';
import { UsdaSearchService } from '../../services/usda/usda-search.service';
import { SearchResultModel } from '../../models/usda/search-result.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleSelectMenuComponent } from '../../components/form-controls/single-select-menu/single-select-menu.component';
import { MultiSelectMenuComponent } from '../../components/form-controls/multi-select-menu/multi-select-menu.component';

@Component({
    selector: 'app-home',
    imports: [
        ReactiveFormsModule,
        SingleSelectMenuComponent,
        MultiSelectMenuComponent,
        InputNumericComponent,
        InputTextComponent,
        SearchComponent,
        SearchResultsComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
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
        dataType: new FormControl<string[]>([]),
        pageSize: new FormControl<number|null>(25),
        pageNumber: new FormControl<number|null>(1),
        brandOwner: new FormControl<string|null>(null),
        sortBy: new FormControl<string|null>({ value: null, disabled: false}),
        sortOrder: new FormControl<string|null>(null),
        tradeChannel: new FormControl<string[]>([]),
        startDate: new FormControl<string|null>(null),
        endDate: new FormControl<string|null>(null)
    });
    
    searchResults = {} as SearchResultModel;

    constructor (
        private usdaSearchService: UsdaSearchService
    ) {
        
    }

    ngOnInit(): void {
    }

    search() {
        const searchCriteria = {
            ...this.queryForm.value,
            ...this.searchCriteriaForm.value
        } as FoodSearchCriteriaModel

        this.usdaSearchService.search(searchCriteria).subscribe({
            next: this.handleSearchResult.bind(this),
            error: this.handleError.bind(this)
        });
    }

    handleSearchResult(searchResult: SearchResultModel) {
        this.searchResults = searchResult;
        this.showSearchCriteria = false;
    }

    handleError(errorResponse: HttpErrorResponse) {

    }

    clearSearchFilters() {
        this.searchCriteriaForm.get('brandOwner')?.setValue('');
        this.searchCriteriaForm.get('selectedSortOrder')?.setValue('');
        this.searchCriteriaForm.get('selectedSortBy')?.setValue('');
        this.searchCriteriaForm.get('selectedDataTypes')?.setValue([]);
        this.searchCriteriaForm.get('selectedTradeChannels')?.setValue([]);
    }

    ngOnDestroy(): void {
    }
}
