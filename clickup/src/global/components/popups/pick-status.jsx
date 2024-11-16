import statuses from "../../variables/status";
import Checkmark from "../../../assets/SVGs/checkmark-icon.svg";

export default function SelectStatusPopUp({ status, setStatus }) {
    return <div className="flex flex-col w-full">
        {statuses.map(item => (
            <button type="button" data-selected={item.name === status} onClick={() => setStatus(item.name)} className="flex justify-between group px-2 rounded-primary h-9 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer items-center p-1">
                <div className="flex gap-2">
                    <div className="h-4 w-4 aspect-square object-contain" >
                        <img src={item.icon} alt="status-icon" />
                    </div>
                    <h6 className="text-[11px]">{item.name}</h6>
                </div>
                <img src={Checkmark} alt="checkmark" className="h-4 w-4 aspect-square object-contain icon-white transition-all duration-100 ease-in-out opacity-0 group-data-[selected=true]:opacity-100" />
            </button>
        ))}
    </div>;
}