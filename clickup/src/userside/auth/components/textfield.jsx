import { ErrorMessage, Field } from "formik";

export default function Textfield({ name, label, placeholder, type, required }) {
    return <div className="flex flex-col w-full gap-[2px]">
        {label != null && <label className="text-xs" htmlFor={`${name}-field`}>{label}</label>}
        <div className="flex flex-row gap-2 rounded-primary border border-inputauth hover:border-inputauthselected transition-all duration-100 focus-within:border-inputauthselected h-10 px-3 text-sm">
            <Field className="flex-grow h-full" required={required} type={type} name={name} id={`${name}-field`} placeholder={placeholder} />
        </div>
        <ErrorMessage className="text-xs text-red-500" component="p" name={name} />
    </div>;
}