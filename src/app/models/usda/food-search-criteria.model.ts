export class FoodSearchCriteriaModel {
    query: string;
    selectedDataTypes: string[]|undefined;
    pageSize: number|undefined;
    pageNumber: number|undefined;
    selectedSortBy: string[]|undefined;
    selectedSortOrder: string|undefined;
    brandOwner: string|undefined;
    selectedTradeChannels: string[]|undefined;
    startDate: string|undefined;
    endDate: string|undefined;

    constructor (query: string) {
        this.query = query
    }
}