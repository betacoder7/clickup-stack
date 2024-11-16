import { FormikProvider, useFormik } from "formik";
import IconButton from "./icon-button";
import Textfield from "./textfield";

import Button from "../../auth/components/button";
import { useDispatch, useSelector } from "react-redux";
import fetch from "../../../utilities/axios/manager";

import * as Yup from "yup";
import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as FolderSlice from "../../../utilities/redux/slices/folders";

import { XMarkIcon } from "@heroicons/react/20/solid";

export default function UpdateFolderDialog({ spaceUUID, folderUUID }) {
    const dispatcher = useDispatch();

    const folder = useSelector(state => state.folderSlice.folders[folderUUID]);

    const formik = useFormik({
        initialValues: {
            name: folder?.name ?? "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
        }),
        onSubmit: onSubmit,
    });

    function onSubmit(values) {
        if (folderUUID != null) {
            updateFolder();
        }
        else {
            createFolder();
        }
    }

    async function createFolder() {
        dispatcher(LoadingBar.setProgress(50));

        const [folderData, folderError] = await fetch({
            route: `/folders/auth/${spaceUUID}`,
            requestType: "post",
            body: {
                name: formik.values.name,
            },
        });

        if (folderError != null) {
            return onError(folderError, createFolder);
        }

        dispatcher(LoadingBar.setProgress(100));

        dispatcher(FolderSlice.add({ folder: folderData["res"], spaceUUID: spaceUUID }));

        dispatcher(BigDialogSlice.hide());
    }

    async function updateFolder() {
        dispatcher(LoadingBar.setProgress(50));

        const [, folderError] = await fetch({
            route: `/folders/auth/${folderUUID}`,
            requestType: "put",
            body: {
                name: formik.values.name,
            },
        });

        if (folderError != null) {
            return onError(folderError, updateFolder);
        }

        dispatcher(LoadingBar.setProgress(100));

        const updatedFolder = {
            ...folder,
            name: formik.values.name,
        };

        dispatcher(FolderSlice.update({ folder: updatedFolder }));

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
        <div className="flex flex-col">
            <div className="flex justify-between items-center w-full">
                <h1 className="font-semibold text-md">{`${folderUUID == null ? "Create" : "Update"} a folder`}</h1>
                <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
            </div>
            <h1 className="font-normal text-xs text-gray-400 pe-10">Use Folders to organize your Lists, Docs and more.</h1>
        </div>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="name-field">Name</label>
                        <div className="w-full flex gap-2">
                            <Textfield placeholder="Folder name" name="name" type="text" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button className="h-10" type="submit" value="continue" />
                    </div>
                </div>
            </form>
        </FormikProvider>
    </div>;
}