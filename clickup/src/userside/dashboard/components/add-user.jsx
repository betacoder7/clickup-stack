import { useDispatch, useSelector } from "react-redux";
import Button from "../../auth/components/button";
import IconButton from "./icon-button";
import SearchTextfield from "./search-textfield";

import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import showToast from "../../../global/functions/toggle-toast";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import fetch from "../../../utilities/axios/manager";
import { Transition } from "@headlessui/react";
import highlightString from "../../../global/functions/substring-highlight";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddUserDialog() {
    const dispatcher = useDispatch();

    const globalSlice = useSelector(state => state.globalSlice);

    const workspaceUUID = globalSlice.defaultWorkspaceUUID;

    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    const [offset, setOffset] = useState(0);
    const [searchUsers, setSearchUsers] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (searchTerm === "") {
            setOpen(false);
        }
        else {
            setOpen(true);
        }

        setFetched(false);
        setOffset(0);
        setHasMore(true);
        setSearchUsers([]);
    }, [searchTerm]);

    useEffect(() => {
        if (offset === 0 || !hasMore) return;

        onSearch(searchTerm);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    async function onSearch(term) {
        const [searchUsersData, searchUsersError] = await fetch({
            route: `/users/search/${term}`,
            requestType: "get",
            params: {
                limit: 10,
                offset: offset,
            }
        });

        if (searchUsersError != null) {
            setError(searchUsersError);
            return;
        }
        else {
            setError(null);
        }

        setFetched(true);

        if (searchUsersData["res"].length < 10) {
            setHasMore(false);
        }

        setSearchUsers([
            ...(searchUsers ?? []),
            ...searchUsersData["res"],
        ]);
    }

    async function submitUser(user) {
        dispatcher(LoadingBar.setProgress(50));

        const [, error] = await fetch({
            route: `/workspaces/auth/${workspaceUUID}/access/${user.uuid}`,
            requestType: "post",
        });

        if (error != null) {
            dispatcher(LoadingBar.setProgress(100));
            return showToast({ text: error });
        }

        dispatcher(LoadingBar.setProgress(100));

        showToast({ text: "User has been given access", success: true });

        dispatcher(BigDialogSlice.hide());
    }

    return <div className="flex flex-col gap-5 text-white">
        <div className="flex flex-col">
            <div className="flex justify-between items-center w-full">
                <h1 className="font-semibold text-md">Add user</h1>
                <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
            </div>
            <h1 className="font-normal text-xs text-gray-400 pe-10">New members will gain access to public Spaces, Docs and Dashboards.</h1>
        </div>
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <label className="text-xs" htmlFor="name-field">Search</label>
                <div className="w-full flex flex-col">
                    <div className="relative w-full">
                        <SearchTextfield onTermChange={setSearchTerm} onSearch={onSearch} placeholder="Search users" name="name" type="text" />

                        <Transition
                            className="absolute z-10 mt-2 top-10 w-full rounded-md bg-gray-700 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            show={open}
                        >
                            <div className="flex flex-col gap-1 rounded-primary w-full h-max max-h-[300px] bg-slate-600 overflow-auto p-2">
                                {fetched && searchUsers != null && searchUsers.length !== 0 ?
                                    <>
                                        {searchUsers.map(user =>
                                            <button type="button" onClick={() => submitUser(user)} key={user.uuid} className="flex px-2 gap-1 items-center rounded-lg h-9 bg-slate-600 hover:bg-slate-500 transition-all duration-100 ease-in-out cursor-pointer p-1">
                                                {highlightString({ strTarget: user.email, subStr: searchTerm, className: "text-sm inline-block" })}
                                            </button>)}

                                        {hasMore && <button type="button" onClick={() => setOffset(offset + 10)} className="flex justify-center px-2 gap-1 items-start rounded-lg h-9 bg-slate-600 hover:bg-slate-500 transition-all duration-100 ease-in-out cursor-pointer p-1">
                                            <div className="h-5 w-5 aspect-square p-1">
                                                <PlusIcon />
                                            </div>
                                            <h4 className="text-sm">More</h4>
                                        </button>}
                                    </>
                                    : !fetched ? Array.from({ length: 5 }).map((_, index) =>
                                        <div className="px-2 gap-2 rounded-lg h-9 bg-slate-500 transition-all duration-100 ease-in-out cursor-pointer items-center p-1 animate-pulse" key={index} />)
                                        : <div className="h-[200px] flex items-center justify-center">
                                            <h4 className="text-sm">No users</h4>
                                        </div>}
                            </div>
                        </Transition>
                    </div>
                    {error != null && <p className="text-xs text-red-500">{error}</p>}
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="button" className="h-10" value="continue" />
            </div>
        </div>
    </div>;
}