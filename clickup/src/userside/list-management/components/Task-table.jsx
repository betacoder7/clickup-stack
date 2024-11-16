import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Taskaddrow } from './Task-add-row';
import PopUp from '../../../global/components/dialog/popup';
import AssigneesProfilesRow from './assignees-profiles-row';
import PickAssignees from '../../../global/components/popups/pick-assignees';
// import Assignee from "../../../assets/SVGs/assignees.svg";
// import { CalendarIcon } from "@heroicons/react/24/outline";
import SingleDatePicker from '../../../global/components/popups/single-date-picker';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';

const TableTask = () => {

    const [assignees, setAssignees] = useState([]);

    // const [showActions, setShowActions] = useState(false);
    // const handleFocus = () => {
    //     setShowActions(true);
    // };
    // const handleBlur = () => {
    //     setShowActions(false);
    // };

    // const [expandedRows, setExpandedRows] = useState([]);
    // const toggleRow = (index) => {
    //     if (expandedRows.includes(index)) {
    //         setExpandedRows(expandedRows.filter(row => row !== index));
    //     } else {
    //         setExpandedRows([...expandedRows, index]);
    //     }
    // };

    const tasks = [
        { task: 'Sample Task 1', assignee: 'John Doe', date: '2024-11-13', priority: 'High' },
        { task: 'Sample Task 2', assignee: 'Jane Smith', date: '2024-11-12', priority: 'Medium' },
        { task: 'Sample Task 3', assignee: 'John Doe', date: '2024-11-13', priority: 'High' },
        { task: 'Sample Task 4', assignee: 'Jane Smith', date: '2024-11-12', priority: 'Medium' },
    ];


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
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="border-b border-gray-500">
                                <tr>
                                    <th className="p-2 w-1/2">Name</th>
                                    <th className="p-2 w-1/6 ">Assignee</th>
                                    <th className="p-2 w-1/6 ">Due Date</th>
                                    <th className="p-2 w-1/6 ">Priority</th>
                                    <th className="p-2 w-1/6 ">Actions</th>
                                    {/* <th className="p-2">Tags</th>
                                    <th className="p-2">Time Tracked</th>
                                    <th className="p-2">Time Estimate</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <React.Fragment key={index}>
                                        {/* <IconButton className="text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </IconButton> */}
                                        <tr className="border-b border-gray-500" >
                                            <td className="p-2 w-1/2">{task.task}</td>
                                            <td className="">
                                                <PopUp className="bg-gray-700 left-0 w-[200px] rounded-primary flex flex-col"
                                                    popoverButton={<div className="rounded-md h-7  px-2 flex items-center  cursor-pointer gap-1">
                                                        {assignees.length === 0 ? <>
                                                            {/* <img src={Assignee} alt="assignee" className="aspect-square h-3 w-3 object-contain " /> */}
                                                            <p className="text-sm text-gray-500">{task.assignee}</p>
                                                        </> : <AssigneesProfilesRow className="h-[14px] w-[14px] !border-none" users={assignees} maxLength={3} />}
                                                    </div>} child={<PickAssignees assignees={assignees} onAdd={(assignee) => setAssignees([...assignees, assignee])} onRemove={(assignee) => {
                                                        const arr = assignees.filter(item => item.uuid !== assignee.uuid);
                                                        setAssignees([...arr]);
                                                    }} />}
                                                /></td>
                                            <td className="">
                                                <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                                                    popoverButton={<div className="rounded-md h-7  px-2 flex items-center cursor-pointer gap-1">
                                                        <p className="text-sm text-gray-500">{task.date}</p>
                                                    </div>} child={<SingleDatePicker
                                                    // value={formik.values.dueDate}
                                                    // onChange={(val) => formik.setFieldValue("dueDate", val)}
                                                    />}
                                                />
                                            </td>
                                            {/* <td className="p-2 w-1/6">{task.priority}</td> */}
                                            <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col p-5"
                                                popoverButton={<div className="rounded-md h-7 px-2 flex items-center cursor-pointer gap-1">
                                                    <p className="text-sm text-gray-500">Due date</p>
                                                </div>} child={
                                                    <div className='items-center w-full p-1'>
                                                        <div className='flex justify-between'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-rose-800">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                                            </svg>
                                                            <p className='text-sm '>Urgent </p>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                                            </svg>
                                                            <p>High </p>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                                            </svg>
                                                            <p>Normal </p>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                                            </svg>
                                                            <p>Low </p>
                                                        </div>
                                                    </div>}
                                            />
                                            <td className="p-2 w-1/6">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
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
        </div>
    );
};
export default TableTask;

// {/* <tbody>
//     {tasks.map((task, index) => (
//         <React.Fragment key={index}>
//             <IconButton className="text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//                 </svg>
//             </IconButton>
//             <tr className="border-b border-gray-500" onClick={() => toggleRow(index)}>
//                 <td className="p-2 w-1/2">{task.task}</td>
//                 <td className="p-2 w-1/6">{task.assignee}</td>
//                 <td className="p-2 w-1/6">{task.date}</td>
//                 <td className="p-2 w-1/6">{task.priority}</td>
//                 <td className="p-2 w-1/6">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                     </svg>
//                 </td>
//             </tr>
//             {expandedRows.includes(index) && (
//                 <tr className="border-b border-gray-500" onClick={() => toggleRow(index)}>
//                     <td className="p-2 w-1/2">{task.task}</td>
//                     <td className="p-2 w-1/6">{task.assignee}</td>
//                     <td className="p-2 w-1/6">{task.date}</td>
//                     <td className="p-2 w-1/6">{task.priority}</td>
//                     <td className="p-2 w-1/6">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                         </svg>
//                     </td>
//                 </tr>
//             )}
//         </React.Fragment>
//     ))}
// </tbody> */}

// import { FormikProvider, useFormik } from 'formik';
// import Textfield from '../../dashboard/components/textfield';
// import PopUp from '../../../global/components/dialog/popup';
// import SelectStatusPopUp from '../../../global/components/popups/pick-status';
// import AssigneesProfilesRow from './assignees-profiles-row';
// import PickAssignees from '../../../global/components/popups/pick-assignees';
// import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
// import SingleDatePicker from '../../../global/components/popups/single-date-picker';
// import UpdateTagsDialog from '../../../global/components/popups/update-tags';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from "yup";
// import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
// import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
// import * as AlertDialog from "../../../utilities/redux/slices/alertdialog";
// import * as FolderSlice from "../../../utilities/redux/slices/folders";
// import { getStatusBackgroundColor } from '../../../global/functions/get-status-color';
// import Assignee from "../../../assets/SVGs/assignees.svg";
// import HourGlassIcon from "../../../assets/SVGs/hourglass.svg";
// import Stopwatch from "../../../assets/SVGs/stopwatch.svg";
// const dispatcher = useDispatch();
// const folder = useSelector(state => state.folderSlice.folders[listUUID]);

// const [assignees, setAssignees] = useState([]);
// const [tags, setTags] = useState([]);

// const formik = useFormik({
//     initialValues: {
//         name: folder?.name ?? "",
//         status: "TODO",
//         dueDate: null,
//     },
//     validationSchema: Yup.object().shape({
//         name: Yup.string().required("Required"),
//     }),
//     onSubmit: onSubmit,
// });

// function onSubmit(values) {
//     if (taskUUID != null) {
//         updateTask();
//     } else {
//         createTask();
//     }
// }

// async function createTask() {
//     dispatcher(LoadingBar.setProgress(50));
//     const [folderData, folderError] = await fetch({
//         route: `/folders/auth/${listUUID}`,
//         requestType: "post",
//         body: {
//             name: formik.values.name,
//         },
//     });

//     if (folderError != null) {
//         return onError(folderError, createTask);
//     }

//     dispatcher(LoadingBar.setProgress(100));
//     dispatcher(FolderSlice.add({ folder: folderData["res"], spaceUUID: listUUID }));
//     dispatcher(BigDialogSlice.hide());
// }

// async function updateTask() {
//     dispatcher(LoadingBar.setProgress(50));
//     const [, folderError] = await fetch({
//         route: `/folders/auth/${taskUUID}`,
//         requestType: "put",
//         body: {
//             name: formik.values.name,
//         },
//     });

//     if (folderError != null) {
//         return onError(folderError, updateTask);
//     }

//     dispatcher(LoadingBar.setProgress(100));
//     const updatedFolder = { ...folder, name: formik.values.name };
//     dispatcher(FolderSlice.update({ folder: updatedFolder }));
//     dispatcher(BigDialogSlice.hide());
// }

// function onError(error, onRetry) {
//     dispatcher(LoadingBar.setProgress(100));
//     dispatcher(AlertDialog.show({
//         type: "error",
//         title: "Error",
//         description: error,
//         positiveButtonText: "Retry",
//         onButtonClicked: (value) => {
//             if (value) {
//                 onRetry();
//             }
//         }
//     }));
// }

// const [tasks, settask] = useState();

//  {/* <table className="min-w-full mt-5 table-auto">
//                 <thead>
//                     <tr>
//                         <th className="text-xs border-slate-500 p-2">Name</th>
//                         <th className="text-xs border-slate-500 p-2">Assignee</th>
//                         <th className="text-xs border-slate-500 p-2">Due Date</th>
//                         <th className="text-xs border-slate-500 p-2">Start Date</th>
//                         <th className="text-xs border-slate-500 p-2">End Date</th>
//                         <th className="text-xs border-slate-500 p-2">Tags</th>
//                         <th className="text-xs border-slate-500 p-2">Time Estimate</th>
//                         <th className="text-xs border-slate-500 p-2">Time Tracked</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tasks.map((task, index) => (
//                     <tr key={index} className="border-b border-gray-700">
//                         <td className="p-2 flex items-center">
//                             <span className="text-teal-400 mr-2">⏱️</span>
//                             {task.name}
//                             {task.category && (
//                                 <span className="ml-2 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">
//                                     {task.category}
//                                 </span>
//                             )}
//                         </td>
//                         <td className="p-2">{task.assignee}</td>
//                         <td className="p-2 text-red-400">{task.dueDate}</td>
//                         <td className="p-2">{task.priority}</td>
//                     </tr>
//                 ))}
//                     <FormikProvider value={formik}>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="flex flex-col gap-5">
//                             <Textfield label="Name" placeholder="Task name" name="name" type="text" />
//                             <div className="flex gap-2 flex-wrap">
//                                 <PopUp
//                                     className="bg-gray-700 left-0 w-[170px] rounded-primary flex flex-col p-1"
//                                     popoverButton={
//                                         <div className={`rounded-md h-7 border border-gray-100 ${getStatusBackgroundColor(formik.values.status)} border-opacity-40 px-2 flex items-center justify-center cursor-pointer`}>
//                                             <p className="text-xs text-gray-100">{formik.values.status}</p>
//                                         </div>
//                                     }
//                                     child={
//                                         <SelectStatusPopUp
//                                             status={formik.values.status}
//                                             setStatus={(val) => formik.setFieldValue("status", val)}
//                                         />
//                                     }
//                                 />
//                                 <PopUp
//                                     className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
//                                     popoverButton={
//                                         <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                             {assignees.length === 0 ? (
//                                                 <>
//                                                     <img src={Assignee} alt="assignee" className="aspect-square h-3 w-3 object-contain" />
//                                                     <p className="text-xs text-gray-100">Assignee</p>
//                                                 </>
//                                             ) : (
//                                                 <AssigneesProfilesRow className="h-[14px] w-[14px] !border-none" users={assignees} maxLength={3} />
//                                             )}
//                                         </div>
//                                     }
//                                     child={
//                                         <PickAssignees
//                                             assignees={assignees}
//                                             onAdd={(assignee) => setAssignees([...assignees, assignee])}
//                                             onRemove={(assignee) => {
//                                                 const arr = assignees.filter(item => item.uuid !== assignee.uuid);
//                                                 setAssignees([...arr]);
//                                             }}
//                                         />
//                                     }
//                                 />
//                                 <PopUp
//                                     className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
//                                     popoverButton={
//                                         <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                             <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
//                                             <p className="text-xs text-gray-100">Due date</p>
//                                         </div>
//                                     }
//                                     child={
//                                         <SingleDatePicker
//                                             value={formik.values.dueDate}
//                                             onChange={(val) => formik.setFieldValue("dueDate", val)}
//                                         />
//                                     }
//                                 />
//                                 <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                     <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
//                                     <p className="text-xs text-gray-100">Start - end date</p>
//                                 </div>
//                                 <PopUp
//                                     className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
//                                     popoverButton={
//                                         <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                             <TagIcon className="aspect-square h-3 w-3 object-contain" />
//                                             <p className="text-xs text-gray-100">{tags.length === 0 ? "Tags" : `${tags.length} ${tags.length === 1 ? "tag" : "tags"}`}</p>
//                                         </div>
//                                     }
//                                     child={
//                                         <UpdateTagsDialog
//                                             onAdd={(tag) => setTags([...tags, tag])}
//                                             tags={tags}
//                                             onRemove={(tag) => {
//                                                 const arr = tags.filter(item => item.uuid !== tag.uuid);
//                                                 setTags([...arr]);
//                                             }}
//                                         />
//                                     }
//                                 />
//                                 <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                     <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
//                                     <p className="text-xs text-gray-100">Time Estimate</p>
//                                 </div>
//                                 <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                     <img src={Stopwatch} alt="stopwatch" className="aspect-square h-3 w-3 object-contain" />
//                                     <p className="text-xs text-gray-100">Time Tracked</p>
//                                 </div>
//                             </div>
//                             <div className="flex justify-end">
//                                 <Button className="h-10" type="submit" value="Create Task">
//                                     Create Task
//                                 </Button>
//                             </div>
//                         </div>
//                     </form>
//                 </FormikProvider>
//                 </tbody>
//             </table> */}




// import React from 'react';
// import { TextField, IconButton, Button } from '@mui/material';
// function Table() {
// const [rows, setRows] = useState([]);
// const [isPopupOpen, setPopupOpen] = useState(false);
// const [editingRow, setEditingRow] = useState(null);
//     return (
//         <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
//             <div className="flex justify-between items-center border-b border-gray-700 pb-2">
//                 <div className="flex items-center gap-2">
//                     <IconButton className="text-gray-400">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//                         </svg>
//                     </IconButton>
//                     <span className="font-semibold">List</span>
//                     <IconButton className="text-gray-400">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                         </svg>

//                     </IconButton>
//                 </div>
//                 <IconButton className="text-gray-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                         <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                     </svg>

//                 </IconButton>
//             </div>

//             <div className="mt-4 pl-6 border-b border-gray-700 pb-4">
//                 <div className="flex items-center gap-2 mb-2">
//                     <div className="bg-gray-600 text-xs py-1 px-3 rounded-full flex items-center">
//                         TO DO
//                     </div>
//                     <span className="text-sm text-gray-400">0</span>
//                     <IconButton className="text-gray-400">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                         </svg>

//                     </IconButton>
//                 </div>

//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <IconButton className="text-gray-400">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//                             </svg>
//                         </IconButton>
//                         <TextField
//                             variant="outlined"
//                             size="small"
//                             placeholder="Task Name"
//                             className="bg-gray-700 text-white rounded-md"
//                             InputProps={{
//                                 style: { color: '#fff', borderColor: '#555' },
//                             }}
//                         />
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <IconButton className="text-gray-400">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                             </svg>


//                         </IconButton>
//                         <IconButton className="text-gray-400">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
//                             </svg>


//                         </IconButton>
//                         <IconButton className="text-gray-400">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
//                             </svg>
//                         </IconButton>
//                         <Button variant="contained" size="small" className="bg-blue-500 text-white">
//                             Save
//                         </Button>
//                     </div>
//                 </div>
//             </div>

//             Add New Task
//             <div className="flex justify-end mt-2">
//                 <IconButton className="text-gray-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
//                         <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                     </svg>


//                 </IconButton>
//             </div>
//         </div>
//     );
// }

// export default Table;

// const handleAddRow = () => {
//     const newRow = { id: Date.now(), task: '', assignee: '', dueDate: '' };
//     setRows([...rows, newRow]);
// };

// const handleEditRow = (row) => {
//     setEditingRow(row);
//     setPopupOpen(true);
// };

// const handleSave = (updatedRow) => {
//     const updatedRows = rows.map((row) =>
//         row.id === updatedRow.id ? updatedRow : row
//     );
//     setRows(updatedRows);
//     setPopupOpen(false);
// };
// {
//     isPopupOpen && (
//         <Popup
//             row={editingRow}
//             onSave={handleSave}
//             onClose={() => setPopupOpen(false)}
//         />
//     );
// }
// <Button
//     onClick={handleAddRow}
//     variant="contained"
//     color="primary"
//     className="mb-4"
// >
//     Add Task
// </Button>;
