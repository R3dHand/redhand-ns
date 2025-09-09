import { AbridgedFoodNutrient } from './abridged-food-nutrient.model'

export interface SearchResultFood {
    // Unique ID of the food.
    fdcId:number
    // The type of the food data.
    dataType: string;
    // The description of the food.
    description: string;
    // Any A unique ID identifying the food within FNDDS.
    foodCode: string;
    foodNutrients: AbridgedFoodNutrient[];
    // Date the item was published to FDC.
    publishedDate: string;
    // The scientific name of the food.
    scientificName: string;
    // Brand owner for the food. Only applies to Branded Foods.
    brandOwner: string;
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
    dataSource: string
    finalFoodInputFoods: any[]
    foodAttributes: any[]
    foodAttributeTypes: any[]
    foodCategory: string
    foodMeasures: any[]
    foodVersionIds: any[]
    householdServingFullText: string
    marketCountry: string
    microbes: any[]
    modifiedDate: string
    packageWeight: string
    servingSize: number
    servingSizeUnit: string
    tradeChannels: string
}