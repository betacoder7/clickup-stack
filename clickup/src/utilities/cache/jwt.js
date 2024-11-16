import { decodeToken } from "react-jwt";

import * as Cache from "./cache-manager";

const setToken = async (jwt) => {
    await Cache.set("jwt", jwt);
};

const getToken = async () => {
    return await Cache.get("jwt");
};

const deleteToken = async () => {
    await Cache.remove("jwt");
};

const getPayload = async () => {
    const token = await getToken();

    return decodeToken(token);
};

export { setToken, getToken, deleteToken, getPayload };