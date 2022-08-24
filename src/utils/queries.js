export const GET_ALL_ARTICLES = `SELECT Title FROM Knowledge__kav WHERE PublishStatus = 'online'  AND Language = 'en_US' WITH DATA CATEGORY Article_Categories__c ABOVE_OR_BELOW All__c`;

export function formQuery(fields, objectApi, conditions){
    let query = `SELECT ${fields.join(',')} FROM ${objectApi}`
    //TODO add where conditions
    return query
}