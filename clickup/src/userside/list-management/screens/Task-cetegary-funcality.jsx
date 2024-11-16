import { useState } from "react";
import PopUp from "../../../global/components/dialog/popup";
import AssigneesProfilesRow from "../components/assignees-profiles-row";
import PickAssignees from "../../../global/components/popups/pick-assignees";
import Assignee from "../../../assets/SVGs/assignees.svg";
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchTextfield from "../../dashboard/components/search-textfield";
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
// import { Typography } from "@mui/material";
import SwitchItem from "../components/switch-toggle";



const Taskcetegaryfunacality = () => {

    const [assignees, setAssignees] = useState([]);
    // const [tags, setTags] = useState([]);
    // const [searchQuery, setSearchQuery] = useState("");
    // Example statuses
    // const filteredStatuses = statuses.filter((item) =>
    //     item.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const [status, setStatus] = useState("Status");
    const statuses = ["To Do", "Pending", "Done", "review"];
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        // console.log(newStatus);
    };

    const [Subtasks, setSubtasks] = useState("Collapse all");
    const handleSubtasksChange = (value) => {
        setSubtasks(value);
        // console.log(value);
    };

    return <div>
        <div className="flex justify-between items-center bg-gray-800  rounded-md mb-5">
            <div className="flex gap-4">
                <PopUp className="bg-gray-700 left-0 w-[125px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1 text-xs text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                        </svg>
                        <p >{`Group: ${status}`}</p>
                    </div>} child={<div className="flex flex-col gap-1">
                        {statuses.length > 0 ? (
                            statuses.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleStatusChange(item)}
                                    className="text-sm text-gray-200 hover:bg-gray-600 rounded-md px-2 py-1"
                                >
                                    {item}
                                </MenuItem>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">No results found</p>
                        )}
                    </div>}
                />
                <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1 text-xs text-gray-100">
                        <p>{`Subtasks: ${Subtasks}`}</p>
                    </div>} child={<div className="flex flex-col gap-1">
                        <Box sx={{ minWidth: 250 }}>
                            <MenuItem
                                onClick={() => handleSubtasksChange("Collapse all (default)")}
                                className="text-gray-200"
                            >
                                Collapse all (default)
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleSubtasksChange("Expand all")}
                                className="text-gray-200"
                            >
                                Expand all
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleSubtasksChange("As separate task")}
                                className="text-gray-200"
                            >
                                As separate task
                            </MenuItem>
                        </Box>
                    </div>}
                />
                <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                        <p className="text-xs text-gray-100">Columns</p>
                    </div>} child={<div>
                        <SearchTextfield placeholder={"search..."} />
                        <div className="flex py-2 justify-between">
                            <p className="text-xs text-gray-100 ">Shown</p>
                            <p className="text-xs text-gray-100 ">Hide All</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                                    </svg>

                                    <p className="text-xs text-gray-100">Task Name</p>
                                </div>
                                <div>
                                    <SwitchItem name="taskname" defaultChecked={false} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <p className="text-xs text-gray-100">Assignee</p>
                                </div>
                                <div>
                                    <SwitchItem name="assignee" defaultChecked={false} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>

                                    <p className="text-xs text-gray-100">Due Date</p>
                                </div>
                                <div>
                                    <SwitchItem name="Due date" defaultChecked={false} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 pr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"></path></svg>
                                    <p className="text-xs text-gray-100">Tages</p>
                                </div>
                                <div>
                                    <SwitchItem name="Tages" defaultChecked={false} />
                                </div>
                            </div>
                        </div>
                    </div>}
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-700 text-gray-200  px-3 py-1 rounded-md text-sm outline-none"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 pr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                        </svg>
                        <p className="text-xs text-gray-100">Filter</p>
                    </div>} child={<div className="w-full h-full p-4">
                        <div className="text-base text-gray-500 text-start">Filter</div>
                        <select className="w-full bg-gray-700 text-sm p-2 border rounded mt-1 ">
                            <option selected className="text-sm">select filter</option>
                            <option className="text-sm hover:bg-gray-600" value="Task name">Task name</option>
                            <option className="text-sm" value="Assignee">Assignee</option>
                            <option className="text-sm" value="Due Date">Due Date</option>
                            <option className="text-sm" value="Start Date">Start Date</option>
                            <option className="text-sm" value="End Date">End Date</option>
                            <option className="text-sm" value="Tages">Tages</option>
                            <option className="text-sm" value="Time Estimate">Time Estimate</option>
                            <option className="text-sm" value="Time Tracked">Time Tracked</option>
                        </select>
                    </div>}
                />
                {/* <button className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <p>Me Mode</p>
                </button> */}
                <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <p className="text-xs text-gray-100">Me Mode</p>
                    </div>} child={<div className="w-full p-2">
                        <p className="text-xs text-gray-400">Tasks where I have assigned</p>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-100">Comments</p>
                            <SwitchItem name="Comments" defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-100">Subtasks</p>
                            <SwitchItem name="Subtasks" defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-100">Checklists</p>
                            <SwitchItem name="Checklists" defaultChecked={true} />
                        </div>
                    </div>}
                />
                <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                        {assignees.length === 0 ? <>
                            <img src={Assignee} alt="assignee" className="aspect-square h-3 w-3 object-contain" />
                            <p className="text-xs text-gray-100">Assignee</p>
                        </> : <AssigneesProfilesRow className="h-[14px] w-[14px] !border-none" users={assignees} maxLength={3} />}
                    </div>} child={<PickAssignees assignees={assignees} onAdd={(assignee) => setAssignees([...assignees, assignee])} onRemove={(assignee) => {
                        const arr = assignees.filter(item => item.uuid !== assignee.uuid);
                        setAssignees([...arr]);
                    }} />}
                />
                <PopUp className="bg-gray-700 left-0 w-[200px] rounded-primary flex flex-col"
                    popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className="text-xs text-gray-100"> Closed</p>
                    </div>} child={<div className="w-full p-2">
                        <div className="flex items-center justify-between p-2">
                            <p className="text-sm text-gray-100">Task</p>
                            <SwitchItem name="Task" size="small" defaultChecked={true} />
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <p className="text-sm text-gray-100">Subtasks</p>
                            <SwitchItem name="Subtasks" size="small" defaultChecked={false} />
                        </div>
                    </div>}
                />
            </div>
        </div>
    </div >;

};

export default Taskcetegaryfunacality;


// <div className="h-full w-full p-4  flex flex-col text-white">
//     <div className="flex justify-between w-full mt-5">
//         <div className="w-full overflow-x-auto overflow-y-hidden my-4  border border-solid border-gray-600 block ">
//             <div>
//                 <div className="font-semibold text-xs leading-4 text-gray-600 -mt-[2px] mb-1 "> Design Team / Alltask</div>
//                 <div className="flex items-center ">
//                     <button className="mr-2 -ml-8 text-[1rem] h-6 w-6 rounded leading-snug">
//                         i
//                     </button>
//                     <div className=""> All Task</div>
//                 </div>
//             </div>

//         </div>
//     </div>
// </div>

//  <div className="p-5 bg-gray-900 text-white ">
//     <h1 className="text-2xl font-bold mb-5">Design Team / All Tasks</h1>

//     <div className="bg-gray-800 rounded-lg p-4">
//         <div className="flex justify-between items-center mb-4">
//             <p className="text-sm">All Tasks</p>
//             <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">+ Add Task</button>
//         </div>

//         <table className="w-full">
//             <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-700">
//                     <th className="p-2">Name</th>
//                     <th className="p-2">Assignee</th>
//                     <th className="p-2">Due Date</th>
//                     <th className="p-2">Priority</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {tasks.map((task, index) => (
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
//             </tbody>
//         </table>
//     </div>
// </div>

// <div className="">
//             <h1 className="text-xl font-bold mb-4">Task Management</h1>
//             <table className="min-w-full bg-gray-800 text-white rounded-lg">
//                 <thead>
//                     <tr className="border-b border-gray-600">
//                         <th className="py-2 px-4">Task Name</th>
//                         <th className="py-2 px-4">Assignee</th>
//                         <th className="py-2 px-4">Due Date</th>
//                         <th className="py-2 px-4">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tasks.map((task) => (
//                         <tr key={task.id} className="border-b border-gray-700">
//                             <td className="py-2 px-4">{task.name}</td>
//                             <td className="py-2 px-4">{task.assignee}</td>
//                             <td className="py-2 px-4">{format(new Date(task.dueDate), 'yyyy-MM-dd')}</td>
//                             <td className="py-2 px-4">
//                                 <Button variant="outlined" color="primary" onClick={() => openDialog(task)}>
//                                     Edit
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             Edit Task Dialog
//             <Dialog open={isDialogOpen} onClose={closeDialog}>
//                 <DialogTitle>Edit Task</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Assignee"
//                         value={currentTask?.assignee || ''}
//                         onChange={(e) => handleEdit('assignee', e.target.value)}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <TextField
//                         label="Due Date"
//                         type="date"
//                         value={currentTask?.dueDate || ''}
//                         onChange={(e) => handleEdit('dueDate', e.target.value)}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <div className="flex justify-end mt-4">
//                         <Button onClick={closeDialog} color="secondary">
//                             Cancel
//                         </Button>
//                         <Button onClick={saveTask} color="primary">
//                             Save
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>