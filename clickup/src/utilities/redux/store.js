import { configureStore } from "@reduxjs/toolkit";

import GlobalReducer from "./slices/global";
import AlertDialogReducer from "./slices/alertdialog";
import BigDialogReducer from "./slices/bigdialog";
import TopLoadingBarReducer from "./slices/toploading-bar";
import UserReducer from "./slices/users";
import WorkspaceReducer from "./slices/workspaces";
import SpaceReducer from "./slices/spaces";
import FolderReducer from "./slices/folders";
import ListReducer from "./slices/lists";
import TaskReducer from "./slices/tasks";

const store = configureStore({
    reducer: {
        globalSlice: GlobalReducer,
        alertDialogSlice: AlertDialogReducer,
        bigDialogSlice: BigDialogReducer,
        topLoadingBarSlice: TopLoadingBarReducer,
        userSlice: UserReducer,
        workspaceSlice: WorkspaceReducer,
        spaceSlice: SpaceReducer,
        folderSlice: FolderReducer,
        listSlice: ListReducer,
        taskSlice: TaskReducer,
    },
});

export default store;