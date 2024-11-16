import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as JwtManager from "../../../utilities/cache/jwt";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as UserSlice from "../../../utilities/redux/slices/users";
import fetch from "../../../utilities/axios/manager";

export default function Authhandler() {
    const [token, setToken] = useState("");
    const dispatcher = useDispatch();

    const user = useSelector(state => state.userSlice);

    useEffect(() => {
        init();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function init() {
        const mtoken = await JwtManager.getToken();

        setToken(mtoken);

        getUser();
    }

    async function getUser() {
        if (user.uuid != null) return;

        dispatcher(LoadingBar.setProgress(50));

        const [userData, userError] = await fetch({
            route: "/users/auth/",
            requestType: "get",
        });

        if (userError != null) {
            return onError();
        }

        dispatcher(LoadingBar.setProgress(100));

        dispatcher(UserSlice.set(userData.res));
    }

    function onError() {
        dispatcher(LoadingBar.setProgress(100));

        JwtManager.deleteToken();

        setToken(null);
    }

    if (token == null) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}