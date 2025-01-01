import { domain } from "../../../utilities/axios/adapter";

export default function AssigneesProfilesRow({ maxLength, users, className, canRemove }) {

    const length = Math.min(users.length, maxLength);
    const remaining = users.length - length;

    return <div className="flex items-center relative">
        {Array.from({ length: length }).map((_, index) => {
            const user = users[index];

            return <div key={user.uuid} style={{ zIndex: users.length - index - 1 }} className={`${className} aspect-square z-[1] border border-slate-600 -ml-1 ${index !== 0 && "first:ml-0"}`}>
                {user.image == null ? <div className="rounded-[50%] aspect-square bg-slate-500 grid place-content-center h-full w-full">
                    <div className="text-white text-[80%]">{user.fullName.at(0)}</div>
                </div>
                    : <img className="rounded-[50%] h-full w-full object-cover" height="100%" width="100%" src={`${domain}/static/${user.image}`} alt="profile" />}
            </div>;
        })}
        {remaining !== 0 && <div className={`${className} text-[10px] bg-white rounded-[50%] grid place-content-center -ml-1 text-black`}>
            <p>+{remaining}</p>
        </div>}

    </div>;
}