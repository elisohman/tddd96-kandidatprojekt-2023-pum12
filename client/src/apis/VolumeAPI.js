import axios from 'axios';


const volumeSeriesCacheMap = new Map();
const CACHE_EXPIRY_TIME_MS = 5 * 60 * 1000;


export const getVolumeSeries = (timeRange, country=null) => {
    let countryPath = "";
    if (country !== null) {
        countryPath = `/${country}`;
    }
    const cacheKey = timeRange + countryPath;
    const request = `/volume/series${countryPath}?time_range=${timeRange}`
    return getCachedData(volumeSeriesCacheMap, cacheKey, request)
};


const getCachedData = (cacheMap, cacheKey, request) => {
    if (cacheMap.has(cacheKey) && 
    Date.now() - cacheMap.get(cacheKey).timestamp < CACHE_EXPIRY_TIME_MS) {
        return cacheMap.get(cacheKey).data;
    }
 
    const cacheData = {
        data: API_call(request),
        timestamp: Date.now()
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
