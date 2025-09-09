import { FoodSearchCriteriaModel } from "./food-search-criteria.model";
import { SearchResultFood } from "./search-result-food.model";

export interface SearchResultModel {
    // A copy of the criteria that were used in the search.
    foodSearchCriteria: FoodSearchCriteriaModel;
    // The total number of foods found matching the search criteria.
    totalHits: number;
    // The current page of results being returned.
    currentPage: number;
    // The total number of pages found matching the search criteria.
    totalPages: number;
    pageList: number[];
    foods: SearchResultFood[];
}