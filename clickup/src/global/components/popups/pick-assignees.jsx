import { useSelector } from "react-redux";
import SearchTextfield from "../../../userside/dashboard/components/search-textfield";
import { useEffect, useState } from "react";
import fetch from "../../../utilities/axios/manager";
import AssigneeAvatar from "../avatars/assignee-avatar";

export default function PickAssignees({ onAdd, onRemove, assignees }) {
    const globalSelector = useSelector(state => state.globalSlice);

    const workspaceUUID = globalSelector.defaultWorkspaceUUID;

    const [searchTerm, setSearchTerm] = useState("");

    const [searchAssignees, setSearchAssignees] = useState(null);
    const [fetched, setFetched] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        setFetched(false);
        setSearchAssignees([]);

        if (searchTerm.length === 0) {
            fetchAllUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    useEffect(() => {
        fetchAllUsers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchAllUsers() {
        const [searchAssigneesData, searchAssigneesError] = await fetch({
            route: `/workspaces/auth/${workspaceUUID}/access`,
            requestType: "get",
        });

        if (searchAssigneesError != null) {
            setError(searchAssigneesError);
            return;
        }
        else {
            setError(null);
        }

        setFetched(true);

        setSearchAssignees([...searchAssigneesData["res"]]);
    }

    async function onSearch(term) {
        if (term.length === 0) return;

        const [searchAssigneesData, searchAssigneesError] = await fetch({
            route: `/workspaces/auth/${workspaceUUID}/access/search/${term}`,
            requestType: "get",
        });

        if (searchAssigneesError != null) {
            setError(searchAssigneesError);
            return;
        }
        else {
            setError(null);
        }

        setFetched(true);

        setSearchAssignees([...searchAssigneesData["res"]]);
    }

    return <div className="flex flex-col w-full">
        <SearchTextfield className="!text-xs !border-0 rounded-none !border-b" onTermChange={setSearchTerm} onSearch={onSearch} placeholder="Search users" name="name" type="text" />
        {error == null && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex flex-col gap-1 rounded-primary w-full overflow-y-auto p-2 h-[250px]">
            {fetched && searchAssignees != null && searchAssignees.length !== 0 ? searchAssignees.map(user =>
                <button type="button" onClick={() => {
                    if (!assignees.some(item => item.uuid === user.uuid)) {
                        onAdd(user);
                    }
                }} key={user.uuid} data-selected={assignees.some(item => item.uuid === user.uuid)} className="group flex px-2 flex-shrink-0 gap-2 items-center rounded-md h-10 hover:bg-gray-600 transition-all duration-100 ease-in-out cursor-pointer p-1">
                    <AssigneeAvatar onRemove={() => onRemove(user)} user={user} className="h-7 w-7" />
                    <h6 className="text-xs">{user.fullName}</h6>
                </button>)
                : !fetched ? Array.from({ length: 6 }).map((_, index) =>
                    <div className="px-2 gap-2 rounded-md h-10 bg-slate-500 transition-all flex-shrink-0 duration-100 ease-in-out cursor-pointer items-center p-1 animate-pulse" key={index} />)
                    : <div className="h-[200px] flex items-center justify-center">
                        <h4 className="text-sm">No users</h4>
                    </div>}
        </div>
    </div>;
}