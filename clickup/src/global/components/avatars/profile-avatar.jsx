import { domain } from "../../../utilities/axios/adapter";

export default function ProfileAvatar({ user, className }) {
    return <div className={`${className} cursor-pointer`}>
        {user.uuid == null ?
            <div className={`rounded-[50%] aspect-square h-full w-full bg-slate-700 ${className} animate-pulse`} />
            : user.image == null ? <div className="rounded-[50%] aspect-square bg-slate-700 grid place-content-center">
                <div className="text-white text-[80%]">{user.fullName.at(0)}</div>
            </div>
                : <img className="rounded-[50%] h-full w-full object-cover" height="100%" width="100%" src={`${domain}/static/${user.image}`} alt="profile" />}
    </div>;
}