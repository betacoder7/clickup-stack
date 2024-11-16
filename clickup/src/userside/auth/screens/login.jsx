import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Textfield from "../components/textfield";
import Button from "../components/button";
import fetch from "../../../utilities/axios/manager";
import { useDispatch } from "react-redux";

import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as JwtManager from "../../../utilities/cache/jwt";
import * as UserSlice from "../../../utilities/redux/slices/users";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
    const formik = useFormik({
        initialValues: {
            "email": "",
            "password": "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Required").email("Invalid email"),
            password: Yup.string().required("Required").min(8, "Too short"),
        }),
        onSubmit: onSubmit,
    });

    const dispatcher = useDispatch();
    const navigate = useNavigate();

    function onSubmit(values) {
        onLogin();
    }

    async function onLogin() {
        dispatcher(LoadingBar.setProgress(50));

        const [loginData, loginError] = await fetch({
            route: "/users/login",
            requestType: "post",
            body: {
                email: formik.values.email,
                password: formik.values.password,
            },
        });

        if (loginError != null) {
            return onError(loginError, onLogin);
        }

        dispatcher(LoadingBar.setProgress(100));

        JwtManager.setToken(loginData.token);

        dispatcher(UserSlice.set(loginData.user));

        navigate("/");
    }

    function onError(error, onRetry) {
        dispatcher(LoadingBar.setProgress(100));

        dispatcher(Alertdialog.show({
            type: "error",
            title: "Error",
            description: error,
            positiveButtonText: "Retry",
            onButtonClicked: (value) => {
                if (value) {
                    onRetry();
                }
            }
        }));
    }

    return <div className="flex flex-col gap-2">
        <h1 className="text-black text-3xl font-semibold self-center mb-5">Welcome back!</h1>

        <FormikProvider value={formik}>
            <form onSubmit={formik.onSubmit}>
                <div className="flex flex-col gap-4 w-full mb-8">
                    <Textfield type="email" label="Work Email" name="email" placeholder="Enter your work email" />
                    <Textfield type="password" label="Password" name="password" placeholder="Enter password" />
                </div>
                <div className="w-full flex flex-col">
                    <Button onClick={formik.handleSubmit} className="h-11" type="submit" value="Log In" />
                </div>
            </form>
        </FormikProvider>
    </div>;
}