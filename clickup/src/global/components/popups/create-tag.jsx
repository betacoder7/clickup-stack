import { useFormik } from "formik";
import Textfield from "../../../userside/dashboard/components/textfield";
import fetch from "../../../utilities/axios/manager"; // Assuming this is your API utility
import { useDispatch, useSelector } from "react-redux";

import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";


import add from "../../../utilities/redux/slices/tag";

export default function AddTagDialog({ onCreateSuccess, onClose }) {

    const dispatcher = useDispatch();

    const globalSlice = useSelector(state => state.globalSlice);
    const workspaceUUID = globalSlice.defaultWorkspaceUUID;
    const formik = useFormik({
        initialValues: {
            tagname: "",
            textColor: "black",
            backgroundColor: "#ffffff",
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                // Prepare the data to send to the server
                const body = {
                    name: values.tagname,
                    textColor: values.textColor,
                    backgroundColor: values.backgroundColor,
                };

                // Call the API to create the tag
                const [tagsdata, tagError] = await fetch({
                    route: `tags/auth/workspace/${workspaceUUID}`, // Adjust the route as needed
                    requestType: "post",
                    body: body,
                });

                if (tagError != null) {
                    return onError(tagError);
                }
                // Call success callback if provided
                if (onCreateSuccess) {
                    onCreateSuccess(tagsdata.res); // Pass created tag back to parent
                }

  
                dispatcher(add({ tag: tagsdata["res"], workspaceUUID: workspaceUUID }));
             

                if (onClose) {
                    onClose();
                }
                resetForm();
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        },
    });


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

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col p-3 w-full">
            <Textfield
                label="Tag Name"
                placeholder="Tag name"
                name="tagname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.tagname}
            />

            <div className="hidden">
                <input id="textColor-field" type="text" name="textColor" />
                <input id="backgroundColor-field" type="text" name="backgroundColor" />
            </div>

            <div className="flex gap-2 mt-4">
                <div className="flex flex-col w-[50%] items-center text-center gap-1">
                    <h4 className="text-xs">Text</h4>
                    <label
                        htmlFor="textColor-field"
                        style={{ backgroundColor: formik.values.textColor }}
                        className="rounded-md h-5 w-5 aspect-square"
                    />
                    <input
                        value={formik.values.textColor}
                        onChange={formik.handleChange}
                        name="textColor"
                        id="textColor-field"
                        type="color"
                    />
                </div>
                <div className="flex flex-col w-[50%] items-center text-center gap-1">
                    <h4 className="text-xs">Background</h4>
                    <label
                        htmlFor="backgroundColor-field"
                        style={{ backgroundColor: formik.values.backgroundColor }}
                        className="rounded-md h-5 w-5 aspect-square"
                    />
                    <input
                        value={formik.values.backgroundColor}
                        onChange={formik.handleChange}
                        name="backgroundColor"
                        id="backgroundColor-field"
                        type="color"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
                Create Tag
            </button>
        </form>
    );
}


