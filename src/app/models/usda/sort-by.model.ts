export class SortByModel {
    none = "";
    dataType = "dataType.keyword";
    lowerCaseDescription = "lowercaseDescription.keyword";
    fdcid = "fdcid";
    publishedDate = "publishedDate";

    options: string[] = [
        "",
        "dataType.keyword",
        "lowercaseDescription.keyword",
        "fdcid",
        "publishedDate"
    ]
}