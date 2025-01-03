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
import * as ListSlice from "../../../utilities/redux/slices/lists";

import { XMarkIcon } from "@heroicons/react/20/solid";

export default function UpdateListDialog({ folderUUID, listUUID }) {
    const dispatcher = useDispatch();

    const list = useSelector(state => state.listSlice.lists[listUUID]);

    // console.log(list ,"listdatabhgjgh");
    

    const formik = useFormik({
        initialValues: {
            name: list?.name ?? "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
        }),
        onSubmit: onSubmit,
    });

    function onSubmit(values) {
        if (listUUID != null) {
            updateList();
        }
        else {
            createList();
        }
    }

    async function createList() {
        dispatcher(LoadingBar.setProgress(50));

        const [listData, listError] = await fetch({
            route: `/lists/auth/${folderUUID}`,
            requestType: "post",
            body: {
                name: formik.values.name,
            },
        });

        if (listError != null) {
            return onError(listError, createList);
        }

        dispatcher(LoadingBar.setProgress(100));

        dispatcher(ListSlice.add({ list: listData["res"], folderUUID: folderUUID }));

        dispatcher(BigDialogSlice.hide());
    }

    async function updateList() {
        dispatcher(LoadingBar.setProgress(50));

        const [, listError] = await fetch({
            route: `/lists/auth/${listUUID}`,
            requestType: "put",
            body: {
                name: formik.values.name,
            },
        });

        if (listError != null) {
            return onError(listError, updateList);
        }

        dispatcher(LoadingBar.setProgress(100));

        const updatedList = {
            ...list,
            name: formik.values.name,
        };

        dispatcher(ListSlice.update({ list: updatedList }));

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
                <h1 className="font-semibold text-md">{`${listUUID == null ? "Create" : "Update"} a list`}</h1>
                <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
            </div>
            <h1 className="font-normal text-xs text-gray-400 pe-10">A List represents major departments or organizations, each with its own workflows, settings, and integrations.</h1>
        </div>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs" htmlFor="name-field">Name</label>
                        <div className="w-full flex gap-2">
                            <Textfield placeholder="List name" name="name" type="text" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="h-10" value="continue" />
                    </div>
                </div>
            </form>
        </FormikProvider>
    </div>;
}