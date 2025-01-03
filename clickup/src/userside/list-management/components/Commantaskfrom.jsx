import { FormikProvider } from "formik";
import Textfield from "../../dashboard/components/textfield";

import Button from "../../auth/components/button";
import Assignee from "../../../assets/SVGs/assignees.svg";
import HourGlassIcon from "../../../assets/SVGs/hourglass.svg";
import Stopwatch from "../../../assets/SVGs/stopwatch.svg";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

import { getStatusBackgroundColor } from "../../../global/functions/get-status-color";
import PopUp from "../../../global/components/dialog/popup";
import SelectStatusPopUp from "../../../global/components/popups/pick-status";
import PickAssignees from "../../../global/components/popups/pick-assignees";
import AssigneesProfilesRow from "./assignees-profiles-row";
import SingleDatePicker from "../../../global/components/popups/single-date-picker";
import UpdateTagsDialog from "../../../global/components/popups/update-tags";
import { useEffect, useState } from "react";



const Commantaskfrom = ({ formik, assignees, setAssignees, tags, setTags }) => {

    return (
        <>
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
                                    formik.setFieldValue("tags", tags);
                                }} />}
                            />
                            <PopUp className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                                popoverButton={<div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                                    {
                                        formik.values.timeEstimate === null ? (<>
                                            <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
                                            <p className="text-xs text-gray-100">Time Estimate</p>
                                        </>) : (
                                            <>
                                                <img src={HourGlassIcon} alt="hourglass" className="aspect-square h-3 w-3 object-contain" />
                                                <p className="text-xs text-gray-100">{formik.values.timeEstimate}</p>
                                            </>
                                        )
                                    }
                                </div>} child={<div>
                                    <input type="text" className="bg-gray-700 w-full p-2 text-gray-500" placeholder="Time Estimate" name="timeestimate" value={formik.values.timeEstimate}
                                        onChange={(e) => formik.setFieldValue("timeEstimate", e.target.value)} />
                                </div>}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button className="h-10" type="submit" value="Create Task" />
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </>
    );
};

export default Commantaskfrom;

 // const [startTime, setStartTime] = useState("");
    // const [endTime, setEndTime] = useState("");

// useEffect(() => {
//     if (startTime && endTime) {
//         calculateDuration();
//     }
// }, [startTime, endTime]);

    // const calculateDuration = (start, end) => {
    //     if (start && end) {
    //         const startTime = new Date(`1970-01-01T${start}:00`);
    //         let endTime = new Date(`1970-01-01T${end}:00`);

    //         // Handle next-day scenario
    //         if (endTime <= startTime) {
    //             endTime.setDate(endTime.getDate() + 1); 
    //         }

    //         const diff = (endTime - startTime) / 1000; 
    //         const hours = Math.floor(diff / 3600);
    //         const minutes = Math.floor((diff % 3600) / 60);
    //         const duration = `${hours}h ${minutes}m`;

    //         // Update formik value for timeTracked
    //         formik.setFieldValue("timeTracked", duration);
    //     }
    // };

    // const [isRunning, setIsRunning] = useState(false);
    // const [time, setTime] = useState(0);

    // useEffect(() => {
    //     let timer;
    //     if (isRunning) {
    //         timer = setInterval(() => {
    //             setTime((prevTime) => prevTime + 1);
    //         }, 1000);
    //     } else {
    //         clearInterval(timer);
    //     }
    //     return () => clearInterval(timer);
    // }, [isRunning]);

    // const handlePlayPause = () => {
    //     setIsRunning(!isRunning);
    // };

    // const formatTime = (timeInSeconds) => {
    //     const minutes = Math.floor(timeInSeconds / 60);
    //     const seconds = timeInSeconds % 60;
    //     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // };

    // useEffect(() => {
    //     formik.setFieldValue("timeTracked", formatTime(time));
    // }, [time, formik]);
// {/*                            <PopUp
//                                 className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
//                                 popoverButton={
//                                     <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
//                                         {formik.values.timeTracked === null ? (
//                                             <>
//                                                 <img
//                                                     src={Stopwatch}
//                                                     alt="stopwatch"
//                                                     className="aspect-square h-3 w-3 object-contain"
//                                                 />
//                                                 <p className="text-xs text-gray-100">Time Tracked</p>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <img
//                                                     src={Stopwatch}
//                                                     alt="stopwatch"
//                                                     className="aspect-square h-3 w-3 object-contain"
//                                                 />
//                                                 <p className="text-xs text-gray-100">{formik.values.timeTracked}</p>
//                                             </>
//                                         )}
//                                     </div>
//                                 }
//                                 child={
//                                     <div className="w-96 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
//                                         <input
//                                             type="text"
//                                             name="timetracked"
//                                             className="bg-gray-700 w-full p-2 text-gray-500"
//                                             placeholder="Time Tracked"
//                                             value={formik.values.timeTracked || ""}
//                                             readOnly
//                                         />
//                                         <div className="mb-4 flex gap-2">
//                                             <input
//                                                 type="time"
//                                                 className="w-full p-2 bg-gray-800 text-white focus:outline-none"
//                                                 value={startTime}
//                                                 onChange={(e) => {
//                                                     setStartTime(e.target.value);
//                                                     calculateDuration(e.target.value, endTime);
//                                                 }}
//                                             />
//                                             <span className="flex items-center text-gray-300">to</span>
//                                             <input
//                                                 type="time"
//                                                 className="w-full p-2 bg-gray-800 text-white focus:outline-none"
//                                                 value={endTime}
//                                                 onChange={(e) => {
//                                                     setEndTime(e.target.value);
//                                                     calculateDuration(startTime, e.target.value);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className="flex justify-center items-center mb-4">
//                                             <div className="text-3xl font-semibold">{formatTime(time)}</div>
//                                         </div>
//                                         <button
//                                             onClick={handlePlayPause}
//                                             className={`px-6 py-2 rounded-lg text-white ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}
//                                         >
//                                             {isRunning ? 'Stop' : 'Start'}
//                                         </button>
//                                     </div>
//                                 }
//                             /> */}