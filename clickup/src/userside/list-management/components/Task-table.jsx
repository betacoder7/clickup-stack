import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Taskaddrow } from './Task-add-row';
import PopUp from '../../../global/components/dialog/popup';
import AssigneesProfilesRow from './assignees-profiles-row';
// import PickAssignees from '../../../global/components/popups/pick-assignees';
import SingleDatePicker from '../../../global/components/popups/single-date-picker';
import { useParams } from 'react-router-dom';
import fetch from "../../../utilities/axios/manager";
import { TagIcon } from '@heroicons/react/24/outline';
// import UpdateTagsDialog from '../../../global/components/popups/update-tags';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFetch } from '../../../utilities/redux/slices/tasks';

import Assignee from "../../../assets/SVGs/assignees.svg";
import Stopwatch from "../../../assets/SVGs/stopwatch.svg";
import Taskpopup from './Task-popup';
import * as Bigdialog from "../../../utilities/redux/slices/bigdialog";
import AuthButton from "../../auth/components/button";

import { useFormik } from "formik";
// import { useDispatch } from 'react-redux';

import Subtask from './Subtask';
// import EditTask from './EditTask';
import UpdateTaskDialog from './update-task';
// import { toggleFetchsubtask } from '../../../utilities/redux/slices/subtask';

const TableTask = () => {

    const { listUUID } = useParams();

    // const featchdata = useSelector(state => state.taskSlice.hasFetched);
    // const taskdataget = featchdata[listUUID];

    // console.log(taskdataget, "taskdataget");

    const dispatcher = useDispatch();
    // const [assignees, setAssignees] = useState([]);
    const [tags, setTags] = useState([]);
    const [listdata, setlistdata] = useState([]);
    // const [subtask, setsubtask] = useState([]);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    async function fetchAlltask() {
        const [tasksData, listoftaskError] = await fetch({
            route: `/tasks/auth/list/${listUUID}/all`,
            requestType: "get",
        });

        if (listoftaskError != null) {
            setError(listoftaskError);
            return;
        }

        setError(null);
        setlistdata([...tasksData["res"]]);
        // console.log(tasksData, "tasksData");

        dispatcher(toggleFetch({ fetched: tasksData["res"], listUUID: listUUID }));
    };

    useEffect(() => {
        fetchAlltask();
    }, [listUUID]);


    const handleRowClick = (task) => {
        setSelectedTask(task);
    };
    const handleClosePopup = () => {
        setSelectedTask(null);
    };
    function onAddTask(uuid, id) {
        dispatcher(Bigdialog.show({
            child: <Subtask taskUUID={uuid} taskId={id} />
        }));
    }


    function onEditTask(e, taskUUID) {
        console.log(taskUUID, "taskUUIDtaskUUIDtaskUUID table");
        console.log(listUUID, "listUUIDlistUUIDlistUUID table");


        e.stopPropagation();
        dispatcher(Bigdialog.show({
            child: <UpdateTaskDialog taskUUID={taskUUID} listUUID={listUUID} />
        }));
    }

    // async function fetchAllSubtask() {
    //     try {
    //         for (const task of taskdataget) {
    //             console.log(task.uuid, "task uuid");
    //             const [subtaskResponse, errorSubtask] = await fetch({
    //                 route: `/subtasks/auth/task/${task.uuid}/all`,
    //                 requestType: "get",
    //             });
    //             if (errorSubtask) {
    //                 setError(errorSubtask);
    //                 return;
    //             }
    //             console.log(subtaskResponse['res'], "subtaskResponse");
    //             setsubtask(subtaskResponse['res']);
    //             dispatcher(toggleFetchsubtask({ fetched: subtask, taskUUID: task.uuid }));
    //         }
    //     } catch (e) {
    //         setError(e.message);
    //     }
    // }
    // const [expandedTaskId, setExpandedTaskId] = useState(null);
    // const handleSubtaskToggle = (taskId) => {
    //     setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    // };
    // console.log(subtask, "subtask ");




    const formik = useFormik({
        initialValues: {
            timeTracked: null,
        },
        // onSubmit: onSubmit,
    });

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        if (startTime && endTime) {
            calculateDuration();
        }
    }, [startTime, endTime]);

    const calculateDuration = (start, end) => {
        if (start && end) {
            const startTime = new Date(`1970-01-01T${start}:00`);
            let endTime = new Date(`1970-01-01T${end}:00`);

            // Handle next-day scenario
            if (endTime <= startTime) {
                endTime.setDate(endTime.getDate() + 1);
            }

            const diff = (endTime - startTime) / 1000;
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const duration = `${hours}h ${minutes}m`;

            // Update formik value for timeTracked
            formik.setFieldValue("timeTracked", duration);
        }
    };

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handlePlayPause = () => {
        setIsRunning(!isRunning);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // useEffect(() => {
    //     formik.setFieldValue("timeTracked", formatTime(time));
    // }, [time, formik]);
    return (
        <div>
            <div className='border border-solid border-gray-600 rounded-md p-4 my-1'>
                <p className='text-xs text-gray-500 pl-8'>Design Team / Nikul / List</p>
                <div className="flex justify-between items-center pt-3 hover:border-b hover:border-gray-700 ">
                    <div className="flex items-center gap-2 ">
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                        <span className="font-semibold">List</span>
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                        </IconButton>
                    </div>
                    <IconButton className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </IconButton>
                </div>
                <div className="mt-4 pl-6 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                        <div className="bg-gray-600 text-xs py-1 px-3 rounded-md flex items-center">
                            TO DO
                        </div>
                        <span className="text-sm text-gray-400">0</span>
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </IconButton>
                    </div>
                    <div className="pl-9 mb-3">
                        {error == null && <p className="text-xs text-red-500">{error}</p>}
                        {/* <th className="p-2 text-center w-1/12">Toggle Subtasks</th> Add a column for the arrow */}
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="border-b border-gray-500">
                                <tr>
                                    {/* <th></th> */}
                                    <th className="p-2 text-start w-1/3">Name</th>
                                    <th className="p-2 text-center ">Assignee</th>  
                                    <th className="p-2 text-center ">Due Date</th>
                                    <th className="p-2 text-center ">Tags</th>
                                    <th className="p-2 text-center">TimeTracked</th>
                                    <th className="p-2 text-center ">Edit</th>
                                    <th className="p-2 text-center ">Add Subtask</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listdata.map((task, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="border-b  border-gray-500 hover:bg-gray-700 group">
                                            {/* <div className="text-center ">
                                                {task.subtasks && task.subtasks.length > 0 && (
                                                    <button
                                                        onClick={() => handleSubtaskToggle(task.id)}
                                                        className="text-gray-400 hover:text-gray-600 flex items-center"
                                                    >
                                                        {expandedTaskId === task.id ? "↓" : "→"}
                                                    </button>
                                                )}
                                            </div> */}
                                            <td className="p-2 w-1/3" onClick={() => handleRowClick(task)}>
                                                {task.name}
                                            </td>
                                            <td className=''>
                                                <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                    {task.assignees.length === 0 ? (
                                                        <>
                                                            <img
                                                                src={Assignee}
                                                                alt="assignee"
                                                                className="aspect-square h-3 w-3 object-contain"
                                                            />
                                                            <p className="text-xs text-gray-100">Assignee</p>
                                                        </>
                                                    ) : (
                                                        <AssigneesProfilesRow
                                                            className="h-[14px] w-[14px] !border-none"
                                                            users={task.assignees}
                                                            maxLength={3}
                                                        />
                                                    )}
                                                </div>
                                                {/* <PopUp
                                                    className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                    popoverButton={
                                                        <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                            {task.assignees.length === 0 ? (
                                                                <>
                                                                    <img
                                                                        src={Assignee}
                                                                        alt="assignee"
                                                                        className="aspect-square h-3 w-3 object-contain"
                                                                    />
                                                                    <p className="text-xs text-gray-100">Assignee</p>
                                                                </>
                                                            ) : (
                                                                <AssigneesProfilesRow
                                                                    className="h-[14px] w-[14px] !border-none"
                                                                    users={task.assignees}
                                                                    maxLength={3}
                                                                />
                                                            )}
                                                        </div>
                                                    }
                                                    child={
                                                        <PickAssignees
                                                            name="assignee"
                                                            assignees={assignees}
                                                            onAdd={(assignee) => setAssignees([...assignees, assignee])}
                                                            onRemove={(assignee) => {
                                                                const arr = assignees.filter((item) => item.uuid !== assignee.uuid);
                                                                setAssignees([...arr]);
                                                            }}
                                                        />
                                                    }
                                                /> */}
                                            </td>
                                            <td>
                                                <PopUp
                                                    className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                                                    popoverButton={
                                                        <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                            <p className="text-sm text-gray-500">
                                                                {new Date(task.dueDate).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    }
                                                    child={<SingleDatePicker />}
                                                />
                                            </td>
                                            <td>
                                                <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                    <TagIcon className="aspect-square h-3 w-3 object-contain" />
                                                    <p className="text-xs text-gray-100">
                                                        {tags.length === 0
                                                            ? `${task.tags.map((value, index) => value.name)}`
                                                            : `${task.tags.length} ${tags.length === 1 ? "tag" : "tags"}`}
                                                    </p>
                                                </div>
                                                {/* <PopUp
                                                    className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                    popoverButton={
                                                        <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                            <TagIcon className="aspect-square h-3 w-3 object-contain" />
                                                            <p className="text-xs text-gray-100">
                                                                {tags.length === 0
                                                                    ? `${task.tags.map((value, index) => value.name)}`
                                                                    : `${task.tags.length} ${tags.length === 1 ? "tag" : "tags"}`}
                                                            </p>
                                                        </div>
                                                    }
                                                    child={
                                                        < UpdateTagsDialog
                                                            name="tags"
                                                            task={task}
                                                            onAdd={(tag) => setTags([...tags, tag])}
                                                            tags={tags}
                                                            onRemove={(tag) => {
                                                                const arr = tags.filter((item) => item.uuid !== tag.uuid);
                                                                setTags([...arr]);
                                                            }}
                                                        />
                                                    }
                                                /> */}
                                            </td>
                                            <td>
                                                <PopUp
                                                    className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                    popoverButton={
                                                        <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                            {formik.values.timeTracked === null ? (
                                                                <>
                                                                    <img
                                                                        src={Stopwatch}
                                                                        alt="stopwatch"
                                                                        className="aspect-square h-3 w-3 object-contain"
                                                                    />
                                                                    <p className="text-xs text-gray-100">Time Tracked</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img
                                                                        src={Stopwatch}
                                                                        alt="stopwatch"
                                                                        className="aspect-square h-3 w-3 object-contain"
                                                                    />
                                                                    <p className="text-xs text-gray-100">{formik.values.timeTracked}</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    }
                                                    child={
                                                        <div className="w-96 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
                                                            <input
                                                                type="text"
                                                                name="timetracked"
                                                                className="bg-gray-700 w-full p-2 text-gray-500"
                                                                placeholder="Time Tracked"
                                                                value={formik.values.timeTracked || ""}
                                                                readOnly
                                                            />
                                                            <div className="mb-4 flex gap-2">
                                                                <input
                                                                    type="time"
                                                                    className="w-full p-2 bg-gray-800 text-white focus:outline-none"
                                                                    value={startTime}
                                                                    onChange={(e) => {
                                                                        setStartTime(e.target.value);
                                                                        calculateDuration(e.target.value, endTime);
                                                                    }}
                                                                />
                                                                <span className="flex items-center text-gray-300">to</span>
                                                                <input
                                                                    type="time"
                                                                    className="w-full p-2 bg-gray-800 text-white focus:outline-none"
                                                                    value={endTime}
                                                                    onChange={(e) => {
                                                                        setEndTime(e.target.value);
                                                                        calculateDuration(startTime, e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center items-center mb-4">
                                                                <div className="text-3xl font-semibold">{formatTime(time)}</div>
                                                            </div>
                                                            <button
                                                                onClick={handlePlayPause}
                                                                className={`px-6 py-2 rounded-lg text-white ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}
                                                            >
                                                                {isRunning ? 'Stop' : 'Start'}
                                                            </button>
                                                        </div>
                                                    }
                                                />
                                            </td>
                                            <td className="text-center">
                                                <AuthButton
                                                    onClick={(e) => onEditTask(e, task.uuid)}
                                                    type="button"
                                                    value="Edit"
                                                />
                                            </td>
                                            <td className="text-center">
                                                <AuthButton
                                                    onClick={() => onAddTask(task.uuid, task.id)}
                                                    type="button"
                                                    value="Add SubTask"
                                                />
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <Taskaddrow />
                </div>
            </div>

            {selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 ">
                    <Taskpopup task={selectedTask} onClose={handleClosePopup} />
                </div>
            )}
        </div>
    );
};
export default TableTask;

//   {/* Conditionally render subtask list */}
//                                         {/* {expandedTaskId === task.id && task.subtasks && task.subtasks.length > 0 && (
//                                             <tr>
//                                                 <td colSpan="6" className="bg-gray-800 p-4">
//                                                     <div>
//                                                         <h3 className="text-white">Subtasks for {task.name}</h3>
//                                                         <ul className="text-gray-400">
//                                                             {task.subtasks.map((subtask, subtaskIndex) => (
//                                                                 <li key={subtaskIndex} className="py-1">
//                                                                     {subtask.name}
//                                                                 </li>
//                                                             ))}
//                                                         </ul>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         )} */}
