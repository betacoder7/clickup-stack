import { FormikProvider, useFormik } from "formik";
import IconButton from "../../dashboard/components/icon-button";
import Textfield from "../../dashboard/components/textfield";

import Button from "../../auth/components/button";
import { useDispatch, useSelector } from "react-redux";
import fetch from "../../../utilities/axios/manager";

import Assignee from "../../../assets/SVGs/assignees.svg";
import HourGlassIcon from "../../../assets/SVGs/hourglass.svg";
import Stopwatch from "../../../assets/SVGs/stopwatch.svg";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

import * as Yup from "yup";
import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as TaskSlice from "../../../utilities/redux/slices/tasks";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { getStatusBackgroundColor } from "../../../global/functions/get-status-color";
import PopUp from "../../../global/components/dialog/popup";
import SelectStatusPopUp from "../../../global/components/popups/pick-status";
import PickAssignees from "../../../global/components/popups/pick-assignees";
import { useState } from "react";
import AssigneesProfilesRow from "./assignees-profiles-row";
import SingleDatePicker from "../../../global/components/popups/single-date-picker";
import UpdateTagsDialog from "../../../global/components/popups/update-tags";
// import { DatePicker } from "@mui/x-date-pickers";

export default function UpdateTaskDialog({ listUUID, taskUUID }) {
    const dispatcher = useDispatch();
    // console.log(listUUID, "listuuid");

    const tasks = useSelector(state => state.taskSlice.tasks[listUUID]);

    const [assignees, setAssignees] = useState([]);
    const [tags, setTags] = useState([]);


    const formik = useFormik({
        initialValues: {
            name: tasks?.name ?? "",
            description: null,
            status: "TODO",
            dueDate: null,
            // assignee: [],
            StartDate: null,
            Enddate: null,
            // tags: [],
            timeestimate: null,
            timetracked: null,

        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
        }),
        onSubmit: onSubmit,
    });

    // console.log(formik.values, 'formik');
    function onSubmit(values) {
        if (taskUUID != null) {
            updateTask();
        }
        else {
            createTask();
        }
    }

    async function createTask() {
        dispatcher(LoadingBar.setProgress(50));
        const body = {
            name: formik.values.name,
            description: formik.values.description,
            status: formik.values.status,
            // assignee: formik.values.assignee,
            dueDate: formik.values.dueDate ? new Date(formik.values.dueDate).toISOString() : null,
            startDate: formik.values.StartDate ? new Date(formik.values.StartDate).toISOString() : null,
            endDate: formik.values.Enddate ? new Date(formik.values.Enddate).toISOString() : null,
            // tags: formik.values.tags,
            timeestimate: formik.values.timeestimate,
            timetracked: formik.values.timetracked,
        };

        console.log(body, "body");


        const [taskData, taskError] = await fetch({
            route: `/tasks/auth/${listUUID}`,
            requestType: "post",
            body: body,
        });

        if (taskError != null) {
            return onError(taskError, createTask);
        }
        dispatcher(LoadingBar.setProgress(100));

        dispatcher(TaskSlice.add({ task: taskData["res"], listUUID: listUUID }));

        dispatcher(BigDialogSlice.hide());
    }

    async function updateTask() {
        dispatcher(LoadingBar.setProgress(50));

        const [, taskError] = await fetch({
            route: `/tasks/auth/${taskUUID}`,
            requestType: "put",
            body: {
                name: formik.values.name,
                description: formik.values.description,
                status: formik.values.status,
                // assignee: formik.values.assignee,
                dueDate: formik.values.dueDate ? new Date(formik.values.dueDate).toISOString() : null,
                startDate: formik.values.StartDate ? new Date(formik.values.StartDate).toISOString() : null,
                endDate: formik.values.Enddate ? new Date(formik.values.Enddate).toISOString() : null,
                // tags: formik.values.tags,
                timeestimate: formik.values.timeestimate,
                timetracked: formik.values.timetracked,
            },
        });

        if (taskError != null) {
            return onError(taskError, updateTask);
        }

        dispatcher(LoadingBar.setProgress(100));

        const updatedTask = {
            ...tasks,
            name: formik.values.name,
        };

        dispatcher(TaskSlice.update({ task: updatedTask }));

        dispatcher(BigDialogSlice.hide());
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

    return <div className="flex flex-col gap-5 text-white">
        <div className="flex justify-between items-center w-full">
            <h1 className="font-semibold text-md">{`${taskUUID == null ? "Create" : "Update"} a task`}</h1>
            <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
        </div>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-5">
                    <Textfield label="Name" placeholder="Task name" name="name" type="text" />
                    <Textfield label="description" placeholder="description" name="description" type="text" />
                    <div className="flex gap-2 flex-wrap">
                        <PopUp className="bg-gray-700 left-0 w-[170px] rounded-primary flex flex-col p-1"
                            popoverButton={<div className={`rounded-md h-7 border border-gray-100 ${getStatusBackgroundColor(formik.values.status)} border-opacity-40 px-2 flex items-center justify-center cursor-pointer`}>
                                <p className="text-xs text-gray-100">{formik.values.status}</p>
                            </div>} child={<SelectStatusPopUp status={formik.values.status} setStatus={(val) => formik.setFieldValue("status", val)} />}
                        />
                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                {assignees.length === 0 ? <>
                                    <img src={Assignee} alt="assignee" className="aspect-square h-3 w-3 object-contain" />
                                    <p className="text-xs text-gray-100">Assignee</p>
                                </> : <AssigneesProfilesRow className="h-[14px] w-[14px] !border-none" users={assignees} maxLength={3} />}
                            </div>} child={<PickAssignees name="assignee" assignees={assignees} onAdd={(assignee) => setAssignees([...assignees, assignee])} onRemove={(assignee) => {
                                const arr = assignees.filter(item => item.uuid !== assignee.uuid);
                                setAssignees([...arr]);
                                // const fullName = assignee.map(item => item.fullName);
                                // console.log(fullName, "fillname");
                                // formik.setFieldValue("assignee", fullName);
                            }} />}
                        />
                        <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                            popoverButton={
                                <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                    {formik.values.dueDate === null ? (
                                        <>
                                            <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
                                            <p className="text-xs text-gray-100">Due date</p>
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-100">
                                            {new Date(formik.values.dueDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            }
                            child={
                                <SingleDatePicker
                                    name="duedate"
                                    value={formik.values.dueDate}
                                    onChange={(val) => formik.setFieldValue("dueDate", val)}
                                />
                            }
                        />

                        <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                {formik.values.StartDate === null ? (<>
                                    <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
                                    <p className="text-xs text-gray-100">Start date</p>
                                </>) : (
                                    <p className="text-xs text-gray-100">{new Date(formik.values.StartDate).toLocaleDateString()}</p>
                                )}
                            </div>} child={<SingleDatePicker
                                name="StartDate"
                                value={formik.values.StartDate}
                                onChange={(val) => formik.setFieldValue("StartDate", val)}
                            />}
                        />
                        <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">{
                                formik.values.Enddate === null ? (<>
                                    <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
                                    <p className="text-xs text-gray-100">End date</p>
                                </>) : (
                                    <p className="text-xs text-gray-100">{new Date(formik.values.Enddate).toLocaleDateString()}</p>
                                )}
                            </div>} child={<SingleDatePicker
                                name="Enddate"
                                value={formik.values.Enddate}
                                onChange={(val) => formik.setFieldValue("Enddate", val)}
                            />}
                        />
                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                <TagIcon className="aspect-square h-3 w-3 object-contain" />
                                <p className="text-xs text-gray-100">{tags.length === 0 ? "Tags" : `${tags.length} ${tags.length === 1 ? "tag" : "tags"}`}</p>
                            </div>} child={<UpdateTagsDialog name="tags" onAdd={(tag) => setTags([...tags, tag])} tags={tags} onRemove={(tag) => {
                                const arr = tags.filter(item => item.uuid !== tag.uuid);
                                setTags([...arr]);
                                // formik.setFieldValue("tags", tags);
                            }} />}
                        />
                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                            popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                {
                                    formik.values.timeestimate === null ? (<>
                                        <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
                                        <p className="text-xs text-gray-100">Time Estimate</p>
                                    </>) : (
                                        <>
                                            <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
                                            <p className="text-xs text-gray-100">{formik.values.timeestimate}</p>
                                        </>
                                    )
                                }
                            </div>} child={<div>
                                <input type="text" className="bg-gray-700 w-full p-2 text-gray-500" placeholder="Time Estimate" name="timeestimate" value={formik.values.timeestimate}
                                    onChange={(e) => formik.setFieldValue("timeestimate", e.target.value)} />
                            </div>}
                        />
                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                            popoverButton={
                                <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                    {formik.values.timetracked === null ? (
                                        <>
                                            <img src={Stopwatch} alt="stopwatch" className="aspect-square h-3 w-3 object-contain" />
                                            <p className="text-xs text-gray-100">Time Tracked</p>
                                        </>
                                    ) : (
                                        <>
                                            <img src={Stopwatch} alt="stopwatch" className="aspect-square h-3 w-3 object-contain" />
                                            <p className="text-xs text-gray-100">{formik.values.timetracked}</p>
                                        </>
                                    )}
                                </div>
                            }
                            child={
                                <div>
                                    <input
                                        type="text"
                                        name="timetracked"
                                        className="bg-gray-700 w-full p-2 text-gray-500"
                                        placeholder="Time Tracked"
                                        value={formik.values.timetracked}
                                        onChange={(e) => formik.setFieldValue("timetracked", e.target.value)}
                                    />
                                </div>
                            }
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button className="h-10" type="submit" value="Create Task" />
                    </div>
                </div>
            </form>
        </FormikProvider>
    </div>;
}