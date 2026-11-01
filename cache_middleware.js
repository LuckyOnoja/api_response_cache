const fs = require('fs');

const queryData = JSON.parse(fs.readFileSync('query_mock.json', 'utf8'));
const queryCache = {};

function simulateDatabaseQuery(queryId) {
    console.log(`[DB QUERY] Fetching data from database for ID: ${queryId}... (Slow operation)`);
    return queryData.mockDatabaseResult;
}

function handleCachedRequest(queryId) {
    console.log(`Handling request for Query: ${queryId}`);

    if(queryCache[queryId]) {
        console.log("CACHE HIT: Returning Cached result instantly.");
        return {source: "cache", data: queryCache[queryId]};
    }

    console.log("CACHE MISS: Querying Database");
    const result = simulateDatabaseQuery(queryId);

    queryCache[queryId] = result;

    return {source: "database", data:result};
}

const firstCall = handleCachedRequest(queryData.queryId);
console.log("Result 1:", firstCall);

const secondCall = handleCachedRequest(queryData.queryId);
console.log("Result 2:", secondCall);