import * as adapter from "./adapter";
import * as CacheManager from "../cache/cache-manager";

export default async function fetch({ route, requestType, body, params, cacheOptions = 'default', cacheKey }) {
    try {
        let cacheData;
        if (cacheKey != null) {
            cacheData = await CacheManager.get(cacheKey);
            if (cacheData != null && cacheOptions === 'fromCache') {
                return [cacheData, null];
            }
        }

        const response = await adapter.fetch({
            route: route, requestType: requestType, body: body, params: params,
        });

        if (cacheKey != null) {
            await CacheManager.set(cacheKey, response.data);
        }

        if (response.data.error != null) {
            return [null, response.data.res, response.status];
        }

        if (cacheOptions === 'forceFetch') {
            return [response.data, null, response.status];
        }

        return [response.data, null, response.status];
    }
    catch (e) {
        let error = e.response?.data?.res ?? e.message ?? "Hmm. Something isn't quite right. That did't go through. Please try again.";

        if (error.includes(":")) {
            error = error.split(":")[1];
        }
        if (e.isAxiosError) {
            return [null, error, e.response?.status];
        }

        return [null, e.toString()];
    }
};