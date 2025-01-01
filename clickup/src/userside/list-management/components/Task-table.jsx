import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Taskaddrow } from './Task-add-row';
import PopUp from '../../../global/components/dialog/popup';
import AssigneesProfilesRow from './assignees-profiles-row';
import PickAssignees from '../../../global/components/popups/pick-assignees';
import SingleDatePicker from '../../../global/components/popups/single-date-picker';
import { useParams } from 'react-router-dom';
import fetch from "../../../utilities/axios/manager";
import { TagIcon } from '@heroicons/react/24/outline';
import UpdateTagsDialog from '../../../global/components/popups/update-tags';
import { useDispatch } from 'react-redux';
import { toggleFetch } from '../../../utilities/redux/slices/tasks';

import Assignee from "../../../assets/SVGs/assignees.svg";
import Taskpopup from './Task-popup';
import * as Bigdialog from "../../../utilities/redux/slices/bigdialog";
import AuthButton from "../../auth/components/button";


// import { useDispatch } from 'react-redux';

import Subtask from './Subtask';

const TableTask = () => {


    const dispatcher = useDispatch();
    const { listUUID } = useParams();
    const [assignees, setAssignees] = useState([]);
    const [tags, setTags] = useState([]);
    const [listdata, setlistdata] = useState([]);
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

        dispatcher(toggleFetch({ fetched: tasksData, listUUID: listUUID }));
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
    function onAddTask(uuid ,id) {
         dispatcher(Bigdialog.show({
            child: <Subtask taskUUID={uuid} taskId={id}/>
        }));
    }

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
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="border-b border-gray-500">
                                <tr className=''>
                                    <th className="p-2  text-start w-1/2">Name</th>
                                    <th className="p-2  text-center w-1/12 ">Assignee</th>
                                    <th className="p-2  text-center w-1/12 ">Due Date</th>
                                    <th className="p-2  text-center w-1/12">Tags</th>
                                    <th className="p-2  text-center w-1/12">Add Subtask</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listdata.map((task, index) => (
                                    <React.Fragment key={index}>

                                        <tr className="border-b border-gray-500 hover:bg-gray-700 group" >
                                            <td className="p-2 w-1/2" onClick={() => handleRowClick(task)}>{task.name}</td>
                                            <td className="">
                                                <PopUp
                                                    className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                    popoverButton={
                                                        <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                            {task.assignees.length === 0 ? (
                                                                <>
                                                                    <img src={Assignee} alt="assignee" className="aspect-square h-3 w-3 object-contain" />
                                                                    <p className="text-xs text-gray-100">Assignee</p>
                                                                </>
                                                            ) :
                                                                <AssigneesProfilesRow className="h-[14px] w-[14px] !border-none" users={task.assignees} maxLength={3} />
                                                            }
                                                        </div>
                                                    }
                                                    child={
                                                        <PickAssignees
                                                            name="assignee"
                                                            assignees={assignees}
                                                            onAdd={(assignee) => setAssignees([...assignees, assignee])}
                                                            onRemove={(assignee) => {
                                                                const arr = assignees.filter(item => item.uuid !== assignee.uuid);
                                                                setAssignees([...arr]);
                                                            }}
                                                        />
                                                    }
                                                />
                                            </td>
                                            <td className="">
                                                <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                                                    popoverButton={<div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                        <p className="text-sm text-gray-500 "> {new Date(task.dueDate).toLocaleDateString()}</p>
                                                    </div>} child={<SingleDatePicker />}
                                                />
                                            </td>
                                            <td className=''>
                                                <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                    popoverButton={<div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                        <TagIcon className="aspect-square h-3 w-3 object-contain" />
                                                        <p className="text-xs text-gray-100">{tags.length === 0 ? `${task.tags.map((value, index) => value.name)}` : `${tags.length} ${tags.length === 1 ? "tag" : "tags"}`}</p>
                                                    </div>} child={<UpdateTagsDialog name="tags" onAdd={(tag) => setTags([...tags, tag])} tags={tags} onRemove={(tag) => {
                                                        const arr = tags.filter(item => item.uuid !== tag.uuid);
                                                        setTags([...arr]);
                                                    }} />}
                                                />
                                            </td>
                                            <td className="text-center">
                                                {/* <div className="flex justify-between items-center w-full">
                                                    <h1 className="font-semibold text-md">{`${taskUUID == null ? "Create" : "Update"} a task`}</h1>
                                                    <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
                                                </div> */}
                                                <AuthButton onClick={ () => onAddTask(task.uuid ,task.id)} type="button" value="Add SubTask" />
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


