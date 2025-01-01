import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as TaskSlice from "../../../utilities/redux/slices/tasks";
import * as Bigdialog from "../../../utilities/redux/slices/bigdialog";

import fetch from "../../../utilities/axios/manager";
import AuthButton from "../../auth/components/button";
import UpdateTaskDialog from "../components/update-task";
// import Popup from "../components/Table-pop";
// import { Button } from "@mui/material";
import Taskcetegaryfunacality from "./Task-cetegary-funcality";
// import AllTask from "../components/All-Task";
import TableTask from "../components/Task-table";

export default function ListManagementScreen() {
    const { listUUID } = useParams();
    const dispatcher = useDispatch();

    const TaskSelector = useSelector(state => state.taskSlice);
    const ListSelector = useSelector(state => state.listSlice);

    const list = ListSelector.lists[listUUID];
    // const tasks = (TaskSelector.tasks[listUUID] ?? []).map(taskId => TaskSelector.tasks[taskId]);
    const listFetched = TaskSelector.hasFetched[listUUID] ?? false;

    useEffect(() => {
        if (!listFetched) {
            fetchTasks();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchTasks() {
        dispatcher(LoadingBar.setProgress(50));

        const [tasksData, tasksError] = await fetch({
            route: `/tasks/auth/list/${listUUID}/all`,
            requestType: "get",
        });

        if (tasksError != null) {
            return onError(tasksError, fetchTasks);
        }

        dispatcher(LoadingBar.setProgress(100));

        for (let i = 0; i < tasksData.length; i++) {
            const task = tasksData[i];

            dispatcher(TaskSlice.add({ task: task, listUUID: listUUID }));
        }

        dispatcher(TaskSlice.toggleFetch({ listUUID: listUUID, fetched: true }));
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

    function onAddTask() {
        dispatcher(Bigdialog.show({ child: <UpdateTaskDialog listUUID={listUUID} /> }));
    }

    return <div className="h-full w-full py-3 px-4  flex flex-col text-white overflow-y-auto">
        <div className="flex justify-between w-full mt-5 ">
            <h1 className="text-2xl font-medium">{list?.name}</h1>
            <AuthButton onClick={onAddTask} type="button" value="Add Task" />
        </div>
        <div class="border-t border-slate-500 my-2"></div>
        <Taskcetegaryfunacality />
        {/* <AllTask /> */}
        <TableTask />
    </div>;
}