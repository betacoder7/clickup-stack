import { useDispatch, useSelector } from "react-redux";
import * as AlertdialogRedux from "../../../utilities/redux/slices/alertdialog";
import { DialogBackdrop, DialogPanel, DialogTitle, Dialog } from "@headlessui/react";

import ErrorIcon from "../../../assets/SVGs/error-icon.svg";
import WarningIcon from "../../../assets/SVGs/warning-icon.svg";
import SuccessIcon from "../../../assets/SVGs/checkmark-icon.svg";

export default function AlertDialog() {
    const dispatcher = useDispatch();
    const alertdialog = useSelector(state => state.alertDialogSlice);

    const icon = getIcon();

    function getIcon() {
        switch (alertdialog.type) {
            case "error": return <img src={ErrorIcon} className="h-[50%] aspect-square object-contain" alt="error icon" />;
            case "warning": return <img src={WarningIcon} className="h-[50%] aspect-square object-contain" alt="warning icon" />;
            case "success": return <img src={SuccessIcon} className="h-[50%] aspect-square object-contain" alt="success icon" />;
            default: return null;
        }
    }

    return <Dialog open={alertdialog.open} onClose={() => dispatcher(AlertdialogRedux.hide())} className="relative z-20">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center items-end p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform w-full overflow-hidden rounded-lg bg-slate-600 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full 
                            ${alertdialog.type === "error" ? "bg-error" : alertdialog.type === "warning" ? "bg-warning" : "bg-success"} sm:mx-0 sm:h-8 sm:w-8`}>
                                {icon}
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-slate-200">
                                    {alertdialog.title}
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-200">
                                        {alertdialog.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={() => {
                                dispatcher(AlertdialogRedux.hide());

                                if (alertdialog.onButtonClicked != null) {
                                    alertdialog.onButtonClicked(true);
                                }
                            }}
                            className="inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                            {alertdialog.positiveButtonText}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                dispatcher(AlertdialogRedux.hide());

                                if (alertdialog.onButtonClicked != null) {
                                    alertdialog.onButtonClicked(false);
                                }
                            }}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>;
}