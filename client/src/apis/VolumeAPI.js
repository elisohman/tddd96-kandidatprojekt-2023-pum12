/** Volume APIs and cached data
 * 
 * This file contains functions and logic for making API calls to the backend and caching the retrieved data.
 */

import axios from 'axios';

// maps for storing cached data
const volumeSeriesCacheMap = new Map();
const volumeTotalCacheMap = new Map();

/**
 * Retrieves a series of volume data for the world or a specified country
 * in a given time_range.
 * 
 * See server/services/volume_service.py for more details.
 */
export const getVolumeSeries = (timeRange, country=null) => {
    let countryPath = "";
    if (country !== null && country !== "World") {
        countryPath = `/${country}`;
    }
    const cacheKey = timeRange + countryPath;
    const request = `/volume/series${countryPath}?time_range=${timeRange}`
    return getCachedData(volumeSeriesCacheMap, cacheKey, request)
};

/**
 * Retrieves the total volume for each country in the world (when no country is specified) 
 * or for each district in a specified country, in a given time_range.
 * 
 * See server/services/volume_service.py for more details.
 */
export const getVolumeTotal = (timeRange, country=null) => {
    let countryPath = "";
    if (country !== "World" && country !== null) {
        countryPath = `/${country}`;
    }
    const cacheKey = timeRange + countryPath;
    const request = `/volume/total${countryPath}?time_range=${timeRange}`
    return getCachedData(volumeTotalCacheMap, cacheKey, request)
};

/**
 * Returns cached data for a request.
 * If no data is found, an API call to the backend (server) is performed for the request and the retireved data is cached.
 */
const getCachedData = (cacheMap, cacheKey, request) => {
    if (cacheMap.has(cacheKey)) {
        return cacheMap.get(cacheKey).data;
    }
 
    const cacheData = {
        data: API_call(request)
    };

    cacheMap.set(cacheKey, cacheData);

    return cacheMap.get(cacheKey).data;
};


const API_call = (request) => {
    return axios
        .get(request)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            throw new Error('API error');
        });
};
