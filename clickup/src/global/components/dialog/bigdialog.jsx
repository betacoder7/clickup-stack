import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import * as BigdialogRedux from "../../../utilities/redux/slices/bigdialog";

export default function BigDialog() {
    const dispatcher = useDispatch();
    const alertdialog = useSelector(state => state.bigDialogSlice);

    return <Dialog open={alertdialog.open} onClose={() => dispatcher(BigdialogRedux.hide())} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center items-end p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform w-full overflow-visible rounded-lg bg-gray-600 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="p-6 sm:p-4">
                        {alertdialog.child}
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>;
}