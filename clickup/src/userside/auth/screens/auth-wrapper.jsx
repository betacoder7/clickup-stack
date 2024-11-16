import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as JwtManager from "../../../utilities/cache/jwt";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as UserSlice from "../../../utilities/redux/slices/users";
import fetch from "../../../utilities/axios/manager";

export default function AuthWrapper() {
    const [buttonText, setButtonText] = useState("");
    const [buttonPath, setButtonPath] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const user = useSelector(state => state.userSlice);

    useEffect(() => {
        init();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function init() {
        const jwt = await JwtManager.getToken();

        if (jwt != null) {
            getUser();
        }
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

        navigate("/");
    }

    function onError() {
        dispatcher(LoadingBar.setProgress(100));

        JwtManager.deleteToken();
    }

    useEffect(() => {
        if (location.pathname === "/signup") {
            setButtonText("Login");
            setButtonPath("/login");
        }
        else if (location.pathname === "/login") {
            setButtonText("Sign up");
            setButtonPath("/signup");
        }
    }, [location]);

    return <div className="w-[100dvw] flex-grow bg-[#fafbfc] flex flex-col relative h-[100dvh]">
        <div className="absolute auth-back-gradient w-full top-[30vh] bottom-0 left-0 overflow-hidden pointer-events-none bg-cover"></div>
        <div className="w-full h-11 flex justify-end px-5 mt-5">
            <Button onClick={() => navigate(buttonPath)} type="button" value={buttonText} />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow z-10">
            <div className="w-[500px] rounded-2xl shadow-lg bg-white p-8">
                <Outlet />
            </div>
        </div>
    </div>;
}