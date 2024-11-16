import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Textfield from "../components/textfield";
import Button from "../components/button";
import fetch from "../../../utilities/axios/manager";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as JwtManager from "../../../utilities/cache/jwt";
import * as userSlice from "../../../utilities/redux/slices/users";

export default function SignUp() {
    const formik = useFormik({
        initialValues: {
            "fullName": "",
            "email": "",
            "password": "",
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().required("Required"),
            email: Yup.string().required("Required").email("Invalid email"),
            password: Yup.string().required("Required").min(8, "Too short"),
        }),
        onSubmit: onSubmit,
    });

    const dispatcher = useDispatch();
    const navigate = useNavigate();

    function onSubmit(values) {
        onSignUp();
    }

    async function onSignUp() {
        dispatcher(LoadingBar.setProgress(25));

        const [, userError] = await fetch({
            route: "/users",
            requestType: "post",
            body: {
                email: formik.values.email,
                password: formik.values.password,
                fullName: formik.values.fullName,
            }
        });

        if (userError != null) {
            return onError(userError, onSignUp);
        }

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
            return onError(loginError, onSignUp);
        }

        dispatcher(LoadingBar.setProgress(100));

        JwtManager.setToken(loginData.token);

        dispatcher(userSlice.set(loginData.user));

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
        <h1 className="text-black text-3xl font-semibold self-center mb-5">Seconds to sign up!</h1>

        <FormikProvider value={formik}>
            <form onSubmit={formik.onSubmit}>
                <div className="flex flex-col gap-4 w-full mb-8">
                    <Textfield type="text" label="Full Name" name="fullName" placeholder="John Doe" />
                    <Textfield type="email" label="Work Email" name="email" placeholder="example@site.com" />
                    <Textfield type="password" label="Password" name="password" placeholder="Minimum 8 characters" />
                </div>
                <div className="w-full flex flex-col">
                    <Button onClick={formik.handleSubmit} type="submit" className="h-11" value="Sign Up" />
                </div>
            </form>
        </FormikProvider>
    </div>;
}