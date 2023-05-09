import axios from 'axios';

const volumeSeriesCacheMap = new Map();
const volumeTotalCacheMap = new Map();

export const getVolumeSeries = (timeRange, country=null) => {
    let countryPath = "";
    if (country !== null) {
        countryPath = `/${country}`;
    }
    const cacheKey = timeRange + countryPath;
    const request = `/volume/series${countryPath}?time_range=${timeRange}`
    return getCachedData(volumeSeriesCacheMap, cacheKey, request)
};

export const getVolumeTotal = (timeRange, country=null) => {
    let countryPath = "";
    if (country !== "World" && country !== null) {
        countryPath = `/${country}`;
    }
    const cacheKey = timeRange + countryPath;
    const request = `/volume/total${countryPath}?time_range=${timeRange}`
    return getCachedData(volumeTotalCacheMap, cacheKey, request)
};

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
