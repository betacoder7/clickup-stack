import { XMarkIcon } from "@heroicons/react/16/solid";
import { domain } from "../../../utilities/axios/adapter";

export default function AssigneeAvatar({ className, user, onRemove }) {

    return <div className={`group aspect-square rounded-[50%] relative ${className}`}>
        {user.image == null ? <div className="rounded-[50%] aspect-square bg-slate-500 grid place-content-center">
            <div className="text-white text-[80%]">{user.fullName.at(0)}</div>
        </div>
            : <img className="rounded-[50%] h-full w-full object-cover" height="100%" width="100%" src={`${domain}/static/${user.image}`} alt="profile" />}
        <div onClick={onRemove} className="group-data-[selected=true]:grid absolute right-[-4px] bottom-[-4px] hidden group-hover:opacity-100 opacity-0 transition-all duration-100 ease-in-out bg-red rounded-[50%] place-content-center h-[14px] w-[14px] p-[2px] border border-gray-700">
            <div className="h-full w-full aspect-square">
                <XMarkIcon className="h-full w-full" />
            </div>
        </div>
    </div>;
}