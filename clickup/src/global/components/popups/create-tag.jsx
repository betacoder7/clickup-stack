import { useFormik } from "formik";
import Textfield from "../../../userside/dashboard/components/textfield";

export default function AddTagDialog() {
    const formik = useFormik({
        initialValues: {
            name: "",
            textColor: "black",
            backgroundColor: "#ffffff",
        }
    });

    return <div className="flex flex-col p-3 w-full">
        <Textfield label="Name" placeholder="Tag name" name="name" type="text" />

        <div className="hidden">
            <input id="textColor-field" type="text" name="textColor" />
            <input id="backgroundColor-field" type="text" name="backgroundColor" />
        </div>

        <div className="flex gap-2 mt-4">
            <div className="flex flex-col w-[50%] items-center text-center gap-1">
                <h4 className="text-xs">Text</h4>
                <label htmlFor="textColor-field" style={{ backgroundColor: formik.values.textColor }} className="rounded-md h-5 w-5 aspect-square" />
                <input value={formik.values.textColor} onChange={formik.handleChange} name="textColor" id="textColor-field" type="color" />
            </div>
            <div className="flex flex-col w-[50%] items-center text-center gap-1">
                <h4 className="text-xs">Background</h4>
                <label htmlFor="backgroundColor-field" style={{ backgroundColor: formik.values.backgroundColor }} className="rounded-md h-5 w-5 aspect-square" />
                <input value={formik.values.backgroundColor} onChange={formik.handleChange} name="backgroundColor" id="backgroundColor-field" type="color" />
            </div>
        </div>
    </div>;
}