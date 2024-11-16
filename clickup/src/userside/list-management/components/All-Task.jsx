import { IconButton } from "@mui/material";
import { Taskaddrow } from "./Task-add-row";

const AllTask = () => {



    return (
        <div>
            <div className='border border-solid border-gray-600 rounded-md p-4 my-1'>
                <p className='text-xs text-gray-500 pl-8'>Design Team / All Task</p>
                <div className="flex justify-between items-center pt-3 hover:border-b hover:border-gray-700 ">
                    <div className="flex items-center gap-2 ">
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                        <span className="font-semibold">All Task</span>
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
                        <div className="bg-gray-600 text-xs py-1 px-3 rounded-md flex items-center bg-gre">
                            Done
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
                                <tr className="border-b border-gray-500">
                                    <td className="p-2 w-1/2">Sample Task 1</td>
                                    <td className="p-2 w-1/6 ">John Doe</td>
                                    <td className="p-2 w-1/6 ">2024-11-13</td>
                                    <td className="p-2 w-1/6 ">High</td>
                                    <td className="p-2 w-1/6 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </td>
                                    {/* <td className="p-2">Development</td>
                                    <td className="p-2">5h 30m</td>
                                    <td className="p-2">8h</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Taskaddrow />
                </div>
                <div className="mt-4 pl-6 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                        <div className="bg-gray-600 text-xs py-1 px-3 rounded-md flex items-center">
                            Review
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
                                <tr className="border-b border-gray-500">
                                    <td className="p-2 w-1/2">Sample Task 1</td>
                                    <td className="p-2 w-1/6 ">John Doe</td>
                                    <td className="p-2 w-1/6 ">2024-11-13</td>
                                    <td className="p-2 w-1/6 ">High</td>
                                    <td className="p-2 w-1/6 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </td>
                                    {/* <td className="p-2">Development</td>
                                    <td className="p-2">5h 30m</td>
                                    <td className="p-2">8h</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Taskaddrow />
                </div>
                <div className="mt-4 pl-6 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <IconButton className="text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                        <div className="bg-gray-600 text-xs py-1 px-3 rounded-md flex items-center">
                            In progress
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
                                <tr className="border-b border-gray-500">
                                    <td className="p-2 w-1/2">Sample Task 1</td>
                                    <td className="p-2 w-1/6 ">John Doe</td>
                                    <td className="p-2 w-1/6 ">2024-11-13</td>
                                    <td className="p-2 w-1/6 ">High</td>
                                    <td className="p-2 w-1/6 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </td>
                                    {/* <td className="p-2">Development</td>
                                    <td className="p-2">5h 30m</td>
                                    <td className="p-2">8h</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Taskaddrow />
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
                                <tr className="border-b border-gray-500">
                                    <td className="p-2 w-1/2">Sample Task 1</td>
                                    <td className="p-2 w-1/6 ">John Doe</td>
                                    <td className="p-2 w-1/6 ">2024-11-13</td>
                                    <td className="p-2 w-1/6 ">High</td>
                                    <td className="p-2 w-1/6 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </td>
                                    {/* <td className="p-2">Development</td>
                                    <td className="p-2">5h 30m</td>
                                    <td className="p-2">8h</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Taskaddrow />
                </div>
            </div>
        </div>
    );
};

export default AllTask;