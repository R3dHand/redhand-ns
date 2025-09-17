import { AbridgedFoodNutrient } from './abridged-food-nutrient.model'

export interface SearchResultFood {
    // Unique ID of the food.
    fdcId:number;
    // The type of the food data.
    dataType: string;
    // The description of the food.
    description: string;
    commonNames: string;
    // Any A unique ID identifying the food within FNDDS.
    foodCode: number;
    foodCategory: string;
    foodCategoryId: number;
    foodNutrients: AbridgedFoodNutrient[] | any;
    // Date the item was published to FDC.
    publishedDate: string;
    // The scientific name of the food.
    scientificName: string;
    // Brand owner for the food. Only applies to Branded Foods.
    brandOwner: string;
    brandName: string;
    // GTIN or UPC code identifying the food. Only applies to Branded Foods.
    gtinUpc: string;
    // The list of ingredients (as it appears on the product label). Only applies to Branded Foods.
    ingredients: string;
    // Unique number assigned for foundation foods. Only applies to Foundation and SRLegacy Foods.
    ndbNumber: string;
    // Any additional descriptions of the food.
    additionalDescriptions: string;
    allHighlightFields:	string;
    // Relative score indicating how well the food matches the search criteria.
    score: number;
    dataSource: string;

    householdServingFullText: string;
    marketCountry: string;
    modifiedDate: string;
    packageWeight: string;
    servingSize: number;
    servingSizeUnit: string;
    tradeChannels: string;
    tags: string[];


    finalFoodInputFoods: any;
    foodAttributes: any;
    foodAttributeTypes: any;
    foodMeasures: any;
    foodVersionIds: any;
    microbes: any;
}