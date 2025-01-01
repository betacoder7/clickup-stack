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
import AssignsSlice from "./slices/taskassigns";
import tagtaskReducer from "./slices/tasktag";
import tagReducer from "./slices/tag";
import subtaskReducer  from "./slices/subtask"
import subtaskassignsReducer from "./slices/subtaskassigns"
import subtasktagReducer from "./slices/subtasktag"

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
        assignsSlice: AssignsSlice,
        tagtaskSlice: tagtaskReducer,
        tagSlice: tagReducer,
        subtaskSlice:subtaskReducer,
        subtaskassignsSlice:subtaskassignsReducer,
        tagsubtaskSlice: subtasktagReducer,
    },
});

export default store;