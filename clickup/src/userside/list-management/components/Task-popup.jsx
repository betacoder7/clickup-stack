import React, { useState } from 'react';
import * as Yup from "yup";
import Assignee from "../../../assets/SVGs/assignees.svg";
import HourGlassIcon from "../../../assets/SVGs/hourglass.svg";
import Stopwatch from "../../../assets/SVGs/stopwatch.svg";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline";
import PopUp from '../../../global/components/dialog/popup';
import SelectStatusPopUp from '../../../global/components/popups/pick-status';
import { getStatusBackgroundColor } from '../../../global/functions/get-status-color';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleDatePicker from '../../../global/components/popups/single-date-picker';
import UpdateTagsDialog from '../../../global/components/popups/update-tags';
import AssigneesProfilesRow from './assignees-profiles-row';
import PickAssignees from '../../../global/components/popups/pick-assignees';


const Taskpopup = ({ task, onClose }) => {
    console.log(task, "task");

    const { listUUID } = useParams();
    const tasks = useSelector(state => state.taskSlice.tasks[listUUID]);
    const [tags, setTags] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const formik = useFormik({
        initialValues: {
            name: tasks?.name ?? "",
            description: null,
            status: "TODO",
            dueDate: null,
            StartDate: null,
            Enddate: null,
            timeTracked: null,
            timeEstimate: null,
            totalTime: null

        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required")
        }),
        // onSubmit: onSubmit,
    });

    const [comment, setComment] = useState("");
    const handleSend = () => {
        if (comment.trim() === "") return;
        console.log("Comment Sent:", comment);
        setComment("");
    };
    const [inputValue, setInputValue] = useState(task.description || '');




    return (
        <div className="bg-black  h-auto mx-auto p-4 rounded-lg gap-4">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 ">
                <div className="bg-black w-3/4  p-6 rounded-lg  overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl text-white font-bold">{task.description} ({task.totalTime})</h1>
                        <button
                            className="text-white text-2xl font-bold"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 ">
                        {/* Left Section */}
                        <div className="col-span-2 space-y-4 mb-10">
                            <div className='mx-auto p-3 gap-2'>
                                <h1 className='font-sans text-2xl'>{task.name}</h1>

                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <PopUp className="bg-gray-700 left-0 w-[170px] rounded-primary flex flex-col p-1"

                                            popoverButton={<div className='flex justify-between items-center'>
                                                <p>status </p>
                                                <div className={`rounded-md h-7 border border-gray-100 ${getStatusBackgroundColor(task.status)} border-opacity-40 px-2 flex items-center justify-center cursor-pointer`}>
                                                    <p className="text-xs text-gray-100">{task.status}</p>
                                                </div>
                                            </div>
                                            }
                                            child={

                                                <SelectStatusPopUp status={formik.values.status} setStatus={(val) => formik.setFieldValue("status", val)} />
                                            }
                                        />
                                    </div>
                                    <div>
                                        <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                                            popoverButton={<div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-x-2'>
                                                    <CalendarIcon className="aspect-square h-3 w-3 object-contain" />
                                                    <p>Dates</p>
                                                </div>

                                                <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                    {formik.values.StartDate === null ? (<>

                                                        <p className="text-xs text-gray-100">{new Date(task.startDate).toLocaleDateString()}</p>
                                                    </>) : (
                                                        <p className="text-xs text-gray-100">Start Date{new Date(formik.values.StartDate).toLocaleDateString()}</p>
                                                    )}
                                                </div>
                                            </div>} child={<SingleDatePicker
                                                name="StartDate"
                                                value={formik.values.StartDate}
                                                onChange={(val) => formik.setFieldValue("StartDate", val)}
                                            />}
                                        />
                                    </div>
                                    <div>
                                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                            popoverButton={<div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-x-2'>
                                                    <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
                                                    <p>time estimate</p>
                                                </div>

                                                <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                    {
                                                        formik.values.timeEstimate === null ? (<>

                                                            <p className="text-xs text-gray-100">{task.timeEstimate}</p>
                                                        </>) : (
                                                            <>
                                                                <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
                                                                <p className="text-xs text-gray-100">{formik.values.timeEstimate}</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            } child={<div>
                                                <input type="text" className="bg-gray-700 w-full p-2 text-gray-500" placeholder="Time Estimate" name="timeestimate" value={formik.values.timeEstimate}
                                                    onChange={(e) => formik.setFieldValue("timeEstimate", e.target.value)} />
                                            </div>}
                                        />
                                    </div>
                                    <div>
                                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                            popoverButton={<div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-x-2'>
                                                    <TagIcon className="aspect-square h-3 w-3 object-contain" />
                                                    <p>Tags</p>
                                                </div>
                                                <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                    {/* <p className="text-xs text-gray-100">{task.tags.name}</p> */}
                                                    <p className="text-xs text-gray-100">{tags.length === 0 ? `${task.tags.map((value, index) => value.name)}` : `${tags.length} ${tags.length === 1 ? "tag" : "tags"}`}</p>
                                                </div>
                                            </div>} child={<UpdateTagsDialog name="tags" onAdd={(tag) => setTags([...tags, tag])} tags={tags} onRemove={(tag) => {
                                                const arr = tags.filter(item => item.uuid !== tag.uuid);
                                                setTags([...arr]);
                                            }} />}
                                        />
                                    </div>
                                    <div>
                                        <PopUp
                                            className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                            popoverButton={
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <img src={Assignee} alt="assignee" className="aspect-square h-3 w-3 object-contain" />
                                                        <p>assignees</p>
                                                    </div>
                                                    <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                        {task.assignees.length === 0 ? (
                                                            <>
                                                                <p className="text-xs text-gray-100">Assignee</p>
                                                            </>
                                                        ) :
                                                            <AssigneesProfilesRow className="h-[14px] w-[14px] !border-none" users={task.assignees} maxLength={3} />
                                                        }
                                                    </div>
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
                                    </div>
                                    <div>

                                        <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                            popoverButton={
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <img src={Stopwatch} alt="stopwatch" className="aspect-square h-3 w-3 object-contain" />
                                                        <p>timeTracked</p>
                                                    </div>
                                                    <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                        {formik.values.timeTracked === null ? (
                                                            <>
                                                                <p className="text-xs text-gray-100">{task.timeTracked}</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img src={Stopwatch} alt="stopwatch" className="aspect-square h-3 w-3 object-contain" />
                                                                <p className="text-xs text-gray-100">{formik.values.timeTracked}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                            }
                                            child={
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="timetracked"
                                                        className="bg-gray-700 w-full p-2 text-gray-500"
                                                        placeholder="Time Tracked"
                                                        value={formik.values.timeTracked}
                                                        onChange={(e) => formik.setFieldValue("timeTracked", e.target.value)}
                                                    />
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>

                                <div className='mx-auto gap-5 border rounded-md mt-3  p-4 '>
                                    <p className='block'>Description</p>
                                    {task.description ? (
                                        <p className='bg-transparent  text-start w-full flex flex-wrap'>{task.description}</p>
                                    ) : (
                                        <input
                                            type='text'
                                            className='bg-transparent p-3 text-start w-full flex flex-wrap border rounded-md'
                                            placeholder='Enter description'
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                    )}
                                </div>


                                <div className='mt-5'>
                                    <h2 className="text-white  font-semibold">Subtasks</h2>
                                    <table className="w-full mt-2 text-sm p-5 border rounded-t-md border-white">
                                        <thead className=''>
                                            <tr className="border-b border-gray-500  py-10">
                                                <th className="text-left px-4 py-2">Name</th>
                                                <th className="text-center px-4 py-2">Assignee</th>
                                                <th className="text-center px-4 py-2">tag</th>
                                                <th className="text-center px-4 py-2">Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-500">
                                                <td className='text-left px-4 py-2'>Healthdiem app 7 screen design (8hr)</td>
                                                <td className="text-center px-4 py-2">
                                                    <PopUp
                                                        className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                        popoverButton={
                                                            <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                                {task.assignees.length === 0 ? (
                                                                    <>
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
                                                <td className="text-center px-4 py-2"><PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                                    popoverButton={
                                                        <div className="rounded-md h-7 px-2 flex items-center justify-center cursor-pointer gap-1">
                                                            <p className="text-xs text-gray-100">
                                                                {task.tags.length === 0
                                                                    ? "No tags"
                                                                    : task.tags.map((tag, index) => (
                                                                        <span key={tag.id}>
                                                                            {tag.name}
                                                                            {index < tags.length - 1 && ", "}
                                                                        </span>
                                                                    ))}
                                                            </p>
                                                        </div>
                                                    } child={<UpdateTagsDialog name="tags" onAdd={(tag) => setTags([...tags, tag])} tags={tags} onRemove={(tag) => {
                                                        const arr = tags.filter(item => item.uuid !== tag.uuid);
                                                        setTags([...arr]);
                                                    }} />}
                                                /></td>
                                                <td className="text-center px-4 py-2">
                                                    <PopUp className="bg-gray-700 left-0 w-[350px] rounded-primary flex flex-col p-5"
                                                        popoverButton={
                                                            <div className="rounded-md h-7  px-2 flex items-center justify-center cursor-pointer gap-1">
                                                                {formik.values.StartDate === null ? (<>

                                                                    <p className="text-xs text-gray-100">{new Date(task.dueDate).toLocaleDateString()}</p>
                                                                </>) : (
                                                                    <p className="text-xs text-gray-100">dueDate</p>
                                                                )}
                                                            </div>
                                                        } child={<SingleDatePicker
                                                            name="StartDate"
                                                            value={formik.values.StartDate}
                                                            onChange={(val) => formik.setFieldValue("StartDate", val)}
                                                        />}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-5'>
                                    <h1 className=''>checklists</h1>
                                    <div className='border rounded-t-md p-2 bg-gray-600 mt-5'>
                                        <p>checklists {("0/0")}</p>
                                    </div>
                                    <div className='border border-t-0 rounded-b-md  p-2'>
                                        <p>+ new checklists item </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Section */}
                        <div>
                            <h2 className="text-white font-semibold mb-4">Activity</h2>
                            <div className="bg-gray-800 rounded-md p-4 h-full overflow-auto flex justify-between flex-col">
                                <div>
                                    <p className="text-gray-400">
                                        use name changed name: Healthdiem app UI design screen (52hr 35min)
                                    </p>
                                    <p className="text-gray-500 mt-2 text-sm">Dec 28 at 9:14 am</p>
                                </div>

                                <div className="flex items-center bg-gray-800 p-2 rounded-md">
                                    <input
                                        type="text"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Write a comment..."
                                        className="flex-grow bg-transparent text-white px-2 py-1 focus:outline-none"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="bg-blue-600 text-white px-4 py-1 ml-2 rounded-md hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Taskpopup;



// {/* <button
// onClick={onClose}
// className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-2"
// >
// Close
// </button> */}