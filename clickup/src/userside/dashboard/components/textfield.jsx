import { ErrorMessage, Field } from "formik";

export default function Textfield({ name, label, placeholder, type, required, ...props }) {
    return <div className="flex flex-col w-full gap-[2px]">
        {label != null && <label className="text-xs" htmlFor={`${name}-field`}>{label}</label>}
        <div className="flex flex-row gap-2 rounded-md border border-slate-500 transition-all duration-100 h-10 px-3 text-sm">
            <Field autoComplete="off" className="flex-grow h-full bg-transparent" required={required} type={type} name={name} id={`${name}-field`} placeholder={placeholder} {...props} />
        </div>
        <ErrorMessage className="text-xs text-red-500" component="p" name={name} />
    </div>;
}