import axios from "axios";

import { getToken } from "../cache/jwt";

export const domain = "http://localhost:4000";

axios.defaults.baseURL = domain;

export async function fetch({ route, requestType, body, params }) {
    const token = await getToken();

    if (token != null) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const config = {
        params: params,
    };

    switch (requestType) {
        case "post":
            return axios.post(route, body, config);
        case "put":
            return axios.put(route, body, config);
        case "get":
            return axios.get(route, config);
        case "delete":
            return axios.delete(route, config);
        default: return null;
    }
};