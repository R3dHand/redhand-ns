import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodSearchCriteriaModel } from '../../models/usda/food-search-criteria.model';
import { SearchResultModel } from '../../models/usda/search-result.model';

@Injectable({
    providedIn: 'root'
})
export class UsdaSearchService {
    apiKey: string  = 'Gaa7CdZ52KybXMgLo7sagPUyf6LNBfE243gh4hho';
    apiUrl: string = '';

    constructor(
        private httpClient: HttpClient
    ) {
        this.apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.apiKey}`;
    }

    search(searchCriteria: FoodSearchCriteriaModel) {
        return this.httpClient.post<SearchResultModel>(this.apiUrl, searchCriteria);
    }
}

