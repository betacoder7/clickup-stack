import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetch from "../../../utilities/axios/manager";

import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as Bigdialog from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as WorkspaceSlice from "../../../utilities/redux/slices/workspaces";
import * as SpaceSlice from "../../../utilities/redux/slices/spaces";
import * as FolderSlice from "../../../utilities/redux/slices/folders";
import * as ListSlice from "../../../utilities/redux/slices/lists";
import * as GlobalSlice from "../../../utilities/redux/slices/global";
import * as Cache from "../../../utilities/cache/cache-manager";

import { PlusIcon, ChevronDownIcon, ChevronRightIcon, ListBulletIcon } from "@heroicons/react/20/solid";
import { PencilIcon, FolderPlusIcon, FolderIcon, FolderOpenIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { domain } from "../../../utilities/axios/adapter";
import PopUp from "../../../global/components/dialog/popup";
import IconButton from "./icon-button";

import CreateWorkspaceDialog from "./create-workspace";
import UpdateSpaceDialog from "./update-space";
import UpdateFolderDialog from "./update-folder";
import UpdateListDialog from "./update-list";
import { useNavigate } from "react-router-dom";
import AddUserDialog from "./add-user";

export default function Sidebar() {
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const globalSelector = useSelector(state => state.globalSlice);

    const spaceUUID = globalSelector.defaultSpaceUUID;
    const workspaceUUID = globalSelector.defaultWorkspaceUUID;

    const workspaceSelector = useSelector(state => state.workspaceSlice);
    const defaultWorkSpace = workspaceSelector.workspaces[workspaceUUID];
    const workspaces = Object.values(workspaceSelector.workspaces);
    const workspaceFetched = workspaceSelector.hasFetched;

    const SpaceSelector = useSelector(state => state.spaceSlice);
    const defaultSpace = SpaceSelector.spaces[spaceUUID];
    const spaces = (SpaceSelector.spaceIds[workspaceUUID] ?? []).map(spaceId => SpaceSelector.spaces[spaceId]);
    const spaceFetched = SpaceSelector.hasFetched[workspaceUUID] ?? false;

    const FolderSelector = useSelector(state => state.folderSlice);
    const ListSelector = useSelector(state => state.listSlice);

    // console.log(FolderSelector, "FolderSelector");
    // console.log(ListSelector, "ListSelector");



    useEffect(() => {
        if (workspaceFetched && defaultWorkSpace == null) {
            dispatcher(GlobalSlice.update({ key: "defaultWorkspaceUUID", action: "delete" }));
        }

        if (spaceFetched && defaultSpace == null) {
            dispatcher(GlobalSlice.update({ key: "defaultSpaceUUID", action: "delete" }));
        }

        if (!workspaceFetched) {
            fetchWorkspaces();
        }

        initFromCache();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        Cache.set("expanded", JSON.stringify({
            spaceExpanded: SpaceSelector.expanded,
            folderExpanded: FolderSelector.expanded,
        }));
    }, [SpaceSelector.expanded, FolderSelector.expanded]);

    async function initFromCache() {
        const obj = await Cache.get("expanded");

        const data = JSON.parse(obj ?? "{}");

        const { spaceExpanded, folderExpanded } = data;

        if (spaceExpanded != null) {
            dispatcher(SpaceSlice.updateExpanded(spaceExpanded));

            Object.keys(spaceExpanded).map(key => {
                const value = spaceExpanded[key];

                if (value) {
                    const fetched = FolderSelector.hasFetched[key] ?? false;

                    if (!fetched) {
                        fetchFolders(key);
                    }
                }

                return null;
            });
        }

        if (folderExpanded != null) {
            dispatcher(FolderSlice.updateExpanded(folderExpanded));

            Object.keys(folderExpanded).map(key => {
                const value = folderExpanded[key];

                if (value) {
                    const fetched = ListSelector.hasFetched[key] ?? false;
                    if (!fetched) {
                        fetchLists(key);
                    }
                }

                return null;
            });
        }
    }

    useEffect(() => {
        if (workspaceUUID != null) {
            Cache.set("defaultWorkspaceUUID", workspaceUUID);
        }

        if (spaceUUID != null) {
            Cache.set("defaultSpaceUUID", spaceUUID);
        }
    }, [workspaceUUID, spaceUUID]);

    useEffect(() => {
        if (defaultWorkSpace == null) return;

        if (!spaceFetched && defaultWorkSpace != null) {
            fetchSpaces();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultWorkSpace]);

    async function fetchWorkspaces() {
        dispatcher(LoadingBar.setProgress(50));

        const [workspacesData, workspacesError] = await fetch({
            route: "/workspaces/auth/all",
            requestType: "get",
        });

        if (workspacesError != null) {
            return onError(workspacesError, fetchWorkspaces);
        }

        dispatcher(LoadingBar.setProgress(100));

        const workspacesList = workspacesData.res;

        for (let i = 0; i < workspacesList.length; i++) {
            const workspace = workspacesList[i];

            dispatcher(WorkspaceSlice.add({ workspace: workspace }));
        }

        dispatcher(WorkspaceSlice.toggleFetch(true));

        const defaultOne = workspaceUUID ?? workspacesList[0]?.uuid;

        if (defaultOne != null) {
            dispatcher(GlobalSlice.update({ key: "defaultWorkspaceUUID", action: "update", value: defaultOne }));
        }
        else if (defaultWorkSpace == null && defaultOne != null) {
            dispatcher(GlobalSlice.update({ key: "defaultWorkspaceUUID", action: "delete" }));
        }
    }

    async function fetchSpaces() {
        dispatcher(LoadingBar.setProgress(50));

        const [spacesData, spacesError] = await fetch({
            route: `/spaces/auth/workspace/${defaultWorkSpace.uuid}/all`,
            requestType: "get",
        });

        if (spacesError != null) {
            return onError(spacesError, fetchSpaces);
        }

        dispatcher(LoadingBar.setProgress(100));

        const spacesList = spacesData.res;

        for (let i = 0; i < spacesList.length; i++) {
            const space = spacesList[i];

            dispatcher(SpaceSlice.add({ space: space, workspaceUUID: defaultWorkSpace.uuid }));
        }

        dispatcher(SpaceSlice.toggleFetch({ workspaceUUID: workspaceUUID, fetched: true }));

        const defaultOne = spaceUUID ?? spacesList[0].uuid;

        if (defaultOne != null) {
            dispatcher(GlobalSlice.update({ key: "defaultSpaceUUID", action: "update", value: defaultOne }));
        }
        else if (defaultSpace == null || defaultOne != null) {
            dispatcher(GlobalSlice.update({ key: "defaultSpaceUUID", action: "delete" }));
        }
    }

    async function fetchFolders(spaceUUID) {
        dispatcher(LoadingBar.setProgress(50));

        const [foldersData, foldersError] = await fetch({
            route: `/folders/auth/space/${spaceUUID}/all`,
            requestType: "get",
        });

        if (foldersError != null) {
            return onError(foldersError, fetchFolders);
        }

        dispatcher(LoadingBar.setProgress(100));

        const foldersList = foldersData.res;

        for (let i = 0; i < foldersList.length; i++) {
            const folder = foldersList[i];

            dispatcher(FolderSlice.add({ folder: folder, spaceUUID: spaceUUID }));
        }

        dispatcher(FolderSlice.toggleFetch({ spaceUUID: spaceUUID, fetched: true }));
    }

    async function fetchLists(folderUUID) {
        dispatcher(LoadingBar.setProgress(50));

        const [listsData, listsError] = await fetch({
            route: `/lists/auth/folder/${folderUUID}/all`,
            requestType: "get",
        });

        if (listsError != null) {
            return onError(listsError, fetchLists);
        }

        dispatcher(LoadingBar.setProgress(100));

        const listsList = listsData.res;

        for (let i = 0; i < listsList.length; i++) {
            const list = listsList[i];

            dispatcher(ListSlice.add({ list: list, folderUUID: folderUUID }));
        }

        dispatcher(ListSlice.toggleFetch({ folderUUID: folderUUID, fetched: true }));
    }

    function onError(error, onRetry) {
        dispatcher(LoadingBar.setProgress(100));

        dispatcher(Alertdialog.show({
            type: "error",
            title: "Error",
            description: error,
            positiveButtonText: "Retry",
            onButtonClicked: (value) => {
                if (value) {
                    onRetry();
                }
            }
        }));
    }

    function onAddSpace() {
        dispatcher(Bigdialog.show({ child: <UpdateSpaceDialog workspaceUUID={defaultWorkSpace.uuid} /> }));
    }

    function onAddWorkspace() {
        dispatcher(Bigdialog.show({ child: <CreateWorkspaceDialog /> }));
    }

    function onEditSpace(e, spaceUUID) {
        e.stopPropagation();

        dispatcher(Bigdialog.show({ child: <UpdateSpaceDialog workspaceUUID={defaultWorkSpace.uuid} spaceUUID={spaceUUID} /> }));
    }

    function onAddFolder(e, spaceUUID) {
        e.stopPropagation();

        dispatcher(Bigdialog.show({ child: <UpdateFolderDialog spaceUUID={spaceUUID} /> }));
    }

    function onEditFolder(e, spaceUUID, folderUUID) {
        e.stopPropagation();

        dispatcher(Bigdialog.show({ child: <UpdateFolderDialog spaceUUID={spaceUUID} folderUUID={folderUUID} /> }));
    }

    function onAddList(e, folderUUID) {
        e.stopPropagation();

        dispatcher(Bigdialog.show({ child: <UpdateListDialog folderUUID={folderUUID} /> }));
    }

    function onEditList(e, folderUUID, listUUID) {
        e.stopPropagation();

        dispatcher(Bigdialog.show({ child: <UpdateListDialog folderUUID={folderUUID} listUUID={listUUID} /> }));
    }

    function onAddUser() {
        dispatcher(Bigdialog.show({ child: <AddUserDialog workspaceUUID={defaultWorkSpace.uuid} /> }));
    }

    return <div className="h-full overflow-y-auto w-[300px] flex flex-col bg-slate-700 flex-shrink-0 px-3 py-2 overflow-auto text-white">
        <div className="w-full">
            {workspaceFetched && defaultWorkSpace == null ?
                <div onClick={onAddWorkspace} className="flex gap-2 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer rounded-primary h-11 items-center px-2">
                    <PlusIcon className="h-5 w-5" />
                    <h4 className="text-sm">New Workspace</h4>
                </div>
                : <PopUp popOverButtonClassName="w-full" popoverButton={
                    <div className="hover:bg-slate-600 transition-all duration-100 ease-in-out p-2 px-3 rounded-primary">
                        {defaultWorkSpace != null && <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center flex-grow">
                                <img src={`${domain}/static/${defaultWorkSpace.image}`} className="aspect-square h-8 w-8 rounded-md object-cover" alt={defaultWorkSpace.name} />
                                <div className="flex flex-col flex-grow items-start">
                                    <h4 className="text-sm">{defaultWorkSpace.name}</h4>
                                    <h4 className="text-xs">{defaultWorkSpace.description}</h4>
                                </div>
                            </div>
                            <div className="h-5 w-5 aspect-square">
                                <ChevronDownIcon />
                            </div>
                        </div>}
                        {(defaultWorkSpace == null && !workspaceFetched) && <div className="w-full rounded-primary h-11 bg-slate-600 animate-pulse"></div>}
                    </div>
                }
                    className="w-[280px] border-slate-500 bg-slate-700 border rounded-primary shadow-md shadow-slate-600 p-2"
                    child={<div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-2">
                            {workspaces.map(workspace =>
                                <div key={workspace.uuid} onClick={() => {
                                    if (workspaceUUID === workspace.uuid) return;

                                    dispatcher(GlobalSlice.update({ key: "defaultWorkspaceUUID", action: "update", value: workspace.uuid }));
                                }} className="flex rounded-primary h-11 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer items-center p-2 gap-2">
                                    <img className="h-8 w-8 rounded-md object-cover aspect-square" src={`${domain}/static/${workspace.image}`} alt={workspace.name} />
                                    <h4 className="text-xs">{workspace.name}</h4>
                                </div>)}
                        </div>
                        <div onClick={onAddWorkspace} className="flex gap-2 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer rounded-primary h-11 items-center px-2">
                            <PlusIcon className="h-4 w-4" />
                            <h4 className="text-xs">New Workspace</h4>
                        </div>
                    </div>} />}
        </div>

        <div className="flex flex-col gap-3 flex-grow">
            {defaultWorkSpace != null && <div className="flex flex-col flex-grow">
                <div className="border-t border-slate-500 my-3" />
                <div className="flex justify-between cursor-pointer h-7 items-center group mb-1">
                    <h4 className="text-xs text-slate-300 font-medium group">Spaces</h4>
                    <button onClick={onAddSpace} className="rounded-md bg-authbutton h-full grid place-content-center aspect-square text-white transition-all duration-100 opacity-0 group-hover:opacity-100">
                        <PlusIcon className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex flex-col gap-1">
                    {!spaceFetched ?
                        Array.from({ length: 4 }).map((_, index) => <div key={index} className="w-full rounded-primary h-9 bg-slate-600 animate-pulse"></div>)
                        : spaceFetched && (spaces != null && spaces.length !== 0) ?
                            spaces.map(space => {
                                // console.log(space, "space");
                                const spaceExpanded = SpaceSelector.expanded[space.uuid] ?? false;
                                const spaceFetched = FolderSelector.hasFetched[space.uuid] ?? false;

                                const folders = (FolderSelector.folderIds[space.uuid] ?? []).map(folderId => FolderSelector.folders[folderId]);

                                return <div key={space.uuid} className="flex flex-col gap-1">
                                    <div onClick={() => {
                                        if (spaceUUID === space.uuid) {
                                            return;
                                        }

                                        if (!spaceFetched) {
                                            fetchFolders(space.uuid);
                                        }

                                        dispatcher(SpaceSlice.toggleExpanded({ spaceUUID: space.uuid, expanded: true }));

                                        dispatcher(GlobalSlice.update({ key: "defaultSpaceUUID", action: "update", value: space.uuid }));
                                    }} data-selected={spaceUUID === space.uuid} data-expanded={spaceExpanded} className="flex group rounded-primary h-9 hover:bg-slate-600 data-[selected=true]:bg-textselected data-[selected=true]:bg-opacity-20 transition-all duration-100 ease-in-out cursor-pointer items-center p-1 gap-2">
                                        <div className="h-7 w-7 aspect-square relative">
                                            {space.image == null ? <div className="h-full w-full rounded-md bg-slate-500 grid place-content-center group-hover:opacity-0 opacity-100">
                                                <div className="text-white text-[80%]">{(space.name.at(0) ?? "A")}</div>
                                            </div>
                                                : <img className="h-full w-full rounded-md object-cover group-hover:opacity-0 opacity-100" alt="space" src={`${domain}/static/${space.image}`}></img>}
                                            <IconButton onClick={(e) => {
                                                e.stopPropagation();

                                                if (!spaceFetched) {
                                                    fetchFolders(space.uuid);
                                                }

                                                dispatcher(SpaceSlice.toggleExpanded({ spaceUUID: space.uuid, expanded: !spaceExpanded }));
                                            }} className="group-hover:opacity-100 opacity-0 absolute top-0 h-full w-full p-1 group-data-[selected=true]:text-textselected" icon={<ChevronRightIcon className="h-full w-full group-data-[expanded=true]:rotate-90 transition-all duration-100 ease-in-out" />} />
                                        </div>
                                        <h4 className="text-xs flex-grow group-data-[selected=true]:text-textselected">{space.name}</h4>
                                        <div className="flex">
                                            <IconButton onClick={(e) => onEditSpace(e, space.uuid)} className="h-7 w-7 p-[6px] group-hover:opacity-100 opacity-0 group-data-[selected=true]:text-textselected group-data-[selected=true]:opacity-100 group-data-[expanded=true]:opacity-100 text-gray-300" icon={<PencilIcon className="h-full w-full" />} />
                                            <IconButton onClick={(e) => onAddFolder(e, space.uuid)} className="h-7 w-7 p-1 group-hover:opacity-100 opacity-0 group-data-[selected=true]:text-textselected group-data-[selected=true]:opacity-100 group-data-[expanded=true]:opacity-100 text-gray-300" icon={<PlusIcon className="h-full w-full" />} />
                                        </div>
                                    </div>
                                    {spaceExpanded && (
                                        <div className="flex flex-col gap-1">
                                            {!spaceFetched ? Array.from({ length: 4 }).map((_, index) => <div key={index} className="w-full rounded-primary h-9 bg-slate-600 animate-pulse" />)
                                                : spaceFetched && (folders != null && folders.length !== 0)
                                                    ? folders.map(folder => {

                                                        // console.log(folder.name);

                                                        const folderExpanded = FolderSelector.expanded[folder.uuid] ?? false;
                                                        const folderFetched = ListSelector.hasFetched[folder.uuid] ?? false;
                                                        // console.log(folderFetched, "folder Fetched");


                                                        const lists = (ListSelector.listIds[folder.uuid] ?? []).map(listId => ListSelector.lists[listId]);

                                                        // console.log(lists, "lists");


                                                        return <div key={folder.uuid} className="flex flex-col gap-1">
                                                            <div onClick={() => {
                                                                if (!folderFetched) {
                                                                    fetchLists(folder.uuid);
                                                                }

                                                                dispatcher(FolderSlice.toggleExpanded({ folderUUID: folder.uuid, expanded: true }));
                                                            }} key={folder.uuid} data-expanded={folderExpanded} className="flex ps-4 group rounded-primary h-9 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer items-center p-1 gap-2">
                                                                <div className="h-7 w-7 aspect-square relative">
                                                                    <div className="p-1 group-hover:opacity-0 opacity-100">
                                                                        {!folderExpanded
                                                                            ? <FolderIcon className="h-full w-full" />
                                                                            : <FolderOpenIcon className="h-full w-full" />}
                                                                    </div>
                                                                    <IconButton onClick={(e) => {
                                                                        e.stopPropagation();

                                                                        if (!folderFetched) {
                                                                            fetchLists(folder.uuid);
                                                                        }

                                                                        dispatcher(FolderSlice.toggleExpanded({ folderUUID: folder.uuid, expanded: !folderExpanded }));
                                                                    }} className="group-hover:opacity-100 opacity-0 absolute p-1 top-0 h-full w-full group-data-[selected=true]:text-textselected" icon={<ChevronRightIcon className="h-full w-full group-data-[expanded=true]:rotate-90 transition-all duration-100 ease-in-out" />} />
                                                                </div>
                                                                <h4 className="text-xs flex-grow group-data-[selected=true]:text-textselected">{folder.name}</h4>

                                                                <div className="flex">
                                                                    <IconButton onClick={(e) => onEditFolder(e, space.uuid, folder.uuid)} className="h-7 w-7 p-[6px] group-hover:opacity-100 opacity-0 group-data-[selected=true]:text-textselected group-data-[selected=true]:opacity-100 group-data-[expanded=true]:opacity-100 text-gray-300" icon={<PencilIcon className="h-full w-full" />} />
                                                                    <IconButton onClick={(e) => onAddList(e, folder.uuid)} className="h-7 w-7 p-1 group-hover:opacity-100 opacity-0 group-data-[selected=true]:text-textselected group-data-[selected=true]:opacity-100 group-data-[expanded=true]:opacity-100 text-gray-300" icon={<PlusIcon className="h-full w-full" />} />
                                                                </div>
                                                            </div>
                                                            {folderExpanded && (
                                                                <div className="flex flex-col gap-1">
                                                                    {!folderFetched ? Array.from({ length: 2 }).map((_, index) => <div key={index} className="w-full rounded-primary h-9 bg-slate-600 animate-pulse" />)
                                                                        : folderFetched && (lists != null && lists.length !== 0)
                                                                            ? lists.map(list =>
                                                                                // ListManagementScreen                                                           
                                                                                <div key={list.uuid} onClick={() => {
                                                                                    navigate(`/list/${list.uuid}`);
                                                                                }} className="flex ps-8 group rounded-primary h-9 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer items-center p-1 gap-2">
                                                                                    <div className="h-7 w-7 aspect-square p-1">
                                                                                        <ListBulletIcon className="h-full w-full" />
                                                                                    </div>
                                                                                    <h4 className="text-xs flex-grow group-data-[selected=true]:text-textselected">{list.name}</h4>
                                                                                    <div className="flex">
                                                                                        <IconButton onClick={(e) => onEditList(e, folder.uuid, list.uuid)} className="h-7 w-7 p-[6px] group-hover:opacity-100 opacity-0 group-data-[selected=true]:text-textselected group-data-[selected=true]:opacity-100 group-data-[expanded=true]:opacity-100 text-gray-300" icon={<PencilIcon className="h-full w-full" />} />
                                                                                    </div>
                                                                                    {/* {console.log(list.name)} */}
                                                                                </div>
                                                                            )
                                                                            : <div onClick={(e) => onAddList(e, folder.uuid)} className="flex gap-2 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer rounded-primary h-9 items-center p-1">
                                                                                <div className="h-7 w-7 p-[6px] text-gray-300">
                                                                                    <PlusIcon className="h-full w-full" />
                                                                                </div>
                                                                                <h4 className="text-xs">New List</h4>
                                                                            </div>}
                                                                </div>)}
                                                        </div>;
                                                    })
                                                    : <div onClick={(e) => onAddFolder(e, space.uuid)} className="flex gap-2 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer rounded-primary h-9 items-center p-1">
                                                        <div className="h-7 w-7 p-[6px] text-gray-300">
                                                            <FolderPlusIcon className="h-full w-full" />
                                                        </div>
                                                        <h4 className="text-xs">New Folder</h4>
                                                    </div>}
                                        </div>)
                                    }
                                </div>;
                            })
                            : <div className="h-[200px] flex items-center justify-center">
                                <h4 className="text-sm">No spaces</h4>
                            </div>}
                </div>
            </div>}
            {defaultWorkSpace != null && <button onClick={onAddUser} className="flex px-2 gap-2 rounded-primary h-9 hover:bg-slate-600 transition-all duration-100 ease-in-out cursor-pointer items-center p-1">
                <div className="h-7 w-7 p-1 aspect-square">
                    <UserPlusIcon />
                </div>
                <h4 className="text-xs">Add user</h4>
            </button>}
        </div>
    </div>;
}