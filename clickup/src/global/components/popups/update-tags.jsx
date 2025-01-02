import { useEffect, useState } from "react";
import SearchTextfield from "../../../userside/dashboard/components/search-textfield";
import fetch from "../../../utilities/axios/manager";
import { useSelector } from "react-redux";
import TagContainer from "../../../userside/list-management/components/tag-container";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddTagDialog from "./create-tag";
import PopUp from "../dialog/popup";

export default function UpdateTagsDialog({ onAdd, onRemove, tags ,task}) {
    const globalSlice = useSelector(state => state.globalSlice);
    const workspaceUUID = globalSlice.defaultWorkspaceUUID;

    // console.log(workspaceUUID, "workspaceuuid");


    const [searchTerm, setSearchTerm] = useState("");
    const [searchTags, setSearchTags] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFetched(false);
        setSearchTags([]);

        if (searchTerm.length === 0) {
            fetchAllTags();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    useEffect(() => {
        fetchAllTags();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchAllTags() {
        const [tagsData, tagsError] = await fetch({
            route: `tags/auth/workspace/${workspaceUUID}/all`,
            requestType: "get",
        });

        if (tagsError != null) {
            setError(tagsError);
            return;
        }
        else {
            setError(null);
        }

        setSearchTags([...tagsData["res"]]);

        setFetched(true);

        // console.log(tagsData, "tagsData");

    }

    async function onSearch(term) {
        if (term.length === 0) return;

        const [tagsData, tagsError] = await fetch({
            route: `tags/auth/workspace/${workspaceUUID}/search/${term}`,
            requestType: "get",
        });

        if (tagsError != null) {
            setError(tagsError);
            return;
        }
        else {
            setError(null);
        }

        setSearchTags([...tagsData["res"]]);

        setFetched(true);

        console.log(tagsData, "tagsData search");
    }

    return <div className="flex flex-col w-full">
        <SearchTextfield className="!text-xs !border-0 rounded-none !border-b" onTermChange={setSearchTerm} onSearch={onSearch} placeholder="Search tags" />
        {error == null && <p className="text-xs text-red-500">{error}</p>}
        <div className="flex flex-wrap gap-2 px-4 pt-3">
            {tags.map(tag => <TagContainer key={tag.uuid} tag={tag} canEdit={true} onRemove={onRemove} />)}
        </div>

        <div className="flex flex-col gap-1 w-full overflow-y-auto p-2 h-[250px]">
            {fetched && searchTags != null && searchTags.length !== 0 ? (
                <>
                    {searchTags.map(tag => <div key={tag.uuid} onClick={() => {
                        if (!tags.some(item => item.uuid === tag.uuid)) {
                            onAdd(tag);
                        }
                    }} className="h-9 flex items-center cursor-pointer hover:bg-slate-600 transition-all duration-200 ease-in-out rounded-lg px-2">
                        <TagContainer tag={tag} />
                    </div>)}
                </>
            ) : searchTerm && fetched && searchTags.length === 0 ? (
                <div className="h-9 flex items-center cursor-pointer hover:bg-slate-600 transition-all duration-200 ease-in-out rounded-lg px-2">
                    <PopUp
                        popoverButton={
                            <div className="flex items-center gap-1">
                                <PlusIcon className="h-4 w-4" />
                                <span>Create "{searchTerm}"</span>
                            </div>
                        }
                        className="bg-gray-700 left-0 w-[230px] rounded-primary flex flex-col"
                        child={<AddTagDialog onCreateSuccess={newTag => {
                            if (!tags.some(item => item.uuid === newTag.uuid)) {
                                onAdd(newTag);
                            }
                        }}
                            onClose={() => {
                                setSearchTerm("");
                            }}
                        />}
                        popOverButtonClassName="w-full"
                    />
                </div>
            ) : !fetched ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div className="px-2 gap-2 rounded-md h-9 bg-slate-500 transition-all flex-shrink-0 duration-100 ease-in-out cursor-pointer items-center p-1 animate-pulse" key={index} />))
            ) : (<div className="h-[200px] flex items-center justify-center">
                <h4 className="text-sm">No tags</h4>
            </div>)
            }
        </div>
    </div>;
};