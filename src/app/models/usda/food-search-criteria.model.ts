export class FoodSearchCriteriaModel {
    query: string;
    dataType: string[]|undefined;
    pageSize: number|undefined;
    pageNumber: number|undefined;
    sortBy: string[]|undefined;
    sortOrder: string|undefined;
    brandOwner: string|undefined;
    tradeChannel: string[]|undefined;
    startDate: string|undefined;
    endDate: string|undefined;

    constructor (query: string) {
        this.query = query
    }
}