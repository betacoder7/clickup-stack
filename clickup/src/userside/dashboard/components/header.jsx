import { useDispatch, useSelector } from "react-redux";
import ProfileAvatar from "../../../global/components/avatars/profile-avatar";
import PopoverItem from "../../../global/components/dialog/popover-item";
import { UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import onLogOut from "../../../global/functions/log-out";

import * as Jwtmanager from "../../../utilities/cache/jwt";
import PopUp from "../../../global/components/dialog/popup";

export default function Header() {
    const userSlice = useSelector(state => state.userSlice);

    const navigate = useNavigate();
    const dispatcher = useDispatch();

    async function logOut() {
        await Jwtmanager.deleteToken();

        await onLogOut(dispatcher);
        navigate("/login");
    }

    return <div className="w-full h-11 bg-slate-600 flex items-center justify-between px-3 flex-shrink-0">
        <p className="text-white text-sm">ClickUp</p>
        <div className="flex gap-2">
            <PopUp
                popoverButton={<ProfileAvatar className="h-7 w-7" user={userSlice} />}
                child={<div className="flex flex-col gap-3 bg-slate-600 rounded-md p-3 w-full border-slate-500 border shadow-md shadow-slate-600">
                    <div className="flex gap-2 items-center">
                        <ProfileAvatar className="h-9 w-9" user={userSlice} />
                        <div className="flex flex-col flex-grow text-white">
                            <h3 className="font-medium text-sm">{userSlice.fullName}</h3>
                            <h6 className="font-normal text-xs">{userSlice.email}</h6>
                        </div>
                    </div>
                    <div className="border-b-1 border-slate-400" />

                    <div className="flex flex-col">
                        <PopoverItem label="Profile" icon={<UserIcon />} onClick={() => navigate("/profile")} />
                        <PopoverItem label="Log out" icon={<ArrowRightStartOnRectangleIcon />} onClick={logOut} />
                    </div>
                </div>}
                className="min-w-[300px]"
            />
        </div>
    </div>;
}