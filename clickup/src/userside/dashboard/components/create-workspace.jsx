import { FormikProvider, useFormik } from "formik";
import IconButton from "./icon-button";
import Textfield from "./textfield";

import Button from "../../auth/components/button";
import { useDispatch } from "react-redux";
import fetch from "../../../utilities/axios/manager";
import toFormData from "../../../global/functions/to-formdata";

import * as Yup from "yup";
import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as WorkspaceSlice from "../../../utilities/redux/slices/workspaces";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function CreateWorkspaceDialog() {
    const dispatcher = useDispatch();

    const [url, setUrl] = useState();

    const formik = useFormik({
        initialValues: {
            image: null,
            name: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
        }),
        onSubmit: onSubmit,
    });

    function onSubmit(values) {
        createWorkspace();
    }

    async function createWorkspace() {
        dispatcher(LoadingBar.setProgress(50));

        const obj = { ...formik.values };

        if (obj.image == null) {
            delete obj.image;
        }

        if (obj.description.length === 0) {
            delete obj.description;
        }

        const [workspaceData, workspaceError] = await fetch({
            route: `/workspaces/auth/`,
            requestType: "post",
            body: toFormData(obj),
        });

        if (workspaceError != null) {
            return onError(workspaceError, createWorkspace);
        }

        dispatcher(LoadingBar.setProgress(100));

        dispatcher(WorkspaceSlice.add({ workspace: workspaceData["res"] }));

        dispatcher(BigDialogSlice.hide());
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

    return <div className="flex flex-col gap-5 text-white">
        <div className="flex justify-between items-center w-full">
            <h1 className="font-semibold text-md">Create a workspace</h1>
            <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
        </div>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs" htmlFor="name-field">Icon & name</label>
                            <div className="w-full flex gap-2">
                                <label htmlFor="image-field" className="flex-shrink-0 cursor-pointer h-10 w-10 aspect-square">
                                    {formik.values.image == null ? <div className="h-full w-full rounded-lg bg-slate-700 grid place-content-center">
                                        <div className="text-white text-[80%]">{(formik.values.name.at(0) ?? "A")}</div>
                                    </div>
                                        : <img className="h-full w-full rounded-lg object-cover" alt="space" src={url}></img>}
                                </label>
                                <div className="hidden">
                                    <input onChange={(e) => {
                                        const file = e.currentTarget.files[0] ?? formik.values.image;

                                        formik.setFieldValue("image", file);

                                        if (url != null) {
                                            URL.revokeObjectURL(url);
                                        }

                                        const murl = URL.createObjectURL(file);

                                        setUrl(murl);
                                    }} id="image-field" name="image" type="file" accept="image/*" />
                                </div>

                                <Textfield placeholder="Workspace name" name="name" type="text" />
                            </div>
                        </div>
                        <Textfield label="description" placeholder="description" name="description" type="text" />
                    </div>

                    <div className="flex justify-end">
                        <Button className="h-10" type="submit" value="continue" />
                    </div>
                </div>
            </form>
        </FormikProvider>
    </div>;
}