import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import fetch from '../../../utilities/axios/manager';
import { useDispatch } from 'react-redux';

import Stopwatch from "../../../assets/SVGs/stopwatch.svg";

import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import PopUp from '../../../global/components/dialog/popup';
import { useParams } from 'react-router-dom';



export const Timetracked = ({ taskID }) => {
    // console.log(taskID, "tasktasktasktask");
    const dispatcher = useDispatch();
    // const { listUUID } = useParams();

    const formik = useFormik({
        initialValues: {
            timeTracked: null,
        },
        onSubmit: onsubmit
    });


    function onsubmit() {
        TimeTracked();
    }

    async function TimeTracked() {
        dispatcher(LoadingBar.setProgress(50));

        const body = {
            date: new Date().toISOString(),
            duration: formik.values.timeTracked
        };

        const [TimeData, TimeError] = await fetch({
            route: `/timeTracked/auth/time/${taskID.uuid}`,
            requestType: "post",
            body: body,
        });

        if (TimeError != null) {
            return onError(TimeError, TimeTracked);
        }

        console.log(TimeData, "TimeData");

        dispatcher(LoadingBar.setProgress(100));
        dispatcher(BigDialogSlice.hide());
    }


    const [timeTrackeddata, setTimeTrackedData] = useState([]);
    async function fetchAlltimeTracked() {
        const [timeTrackedDate, timeTrackedError] = await fetch({
            route: `/timeTracked/auth/totaltime/${taskID.uuid}`,
            requestType: "get",
        });

        if (timeTrackedError != null) {
            onError(timeTrackedError);
        }

        setTimeTrackedData(timeTrackedDate['res']);
    }
    useEffect(() => {
        fetchAlltimeTracked();
    }, [taskID]);

    // console.log(timeTrackeddata, "timeTrackeddata 111111");

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
        if (isRunning) {
            setIsRunning(false);
            formik.setFieldValue('timeTracked', formatTime(time));
        } else {
            setTime(0); 
            setIsRunning(true);
        }
    };

    // const formatTime = (timeInSeconds) => {
    //     const minutes = Math.floor(timeInSeconds / 60);
    //     const seconds = timeInSeconds % 60;
    //     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600); // Get hours
        const minutes = Math.floor((timeInSeconds % 3600) / 60); // Get remaining minutes
        const seconds = timeInSeconds % 60; // Get remaining seconds
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    

    return (
        <>
            <PopUp
                className="bg-gray-700 left-0 w-[250px] rounded-primary flex flex-col"
                popoverButton={
                    <div className="rounded-md h-7 border border-gray-100 border-opacity-40 px-2 flex items-center justify-center cursor-pointer gap-1">
                        {
                            timeTrackeddata.length > 0 && timeTrackeddata[0].overall.hours === 0 && timeTrackeddata[0].overall.minutes === 0 ? (
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
                                    {
                                        timeTrackeddata.map((value, index) => {
                                            return (
                                                <p key={index}>Task Total Timer :- {`${value.overall.hours}H :${value.overall.minutes}M`}</p>
                                            );
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                }
                child={
                    <div className="w-96 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
                        <p key={taskID.id}>{taskID.name} </p>
                        <input
                            type="text"
                            name="timetracked"
                            className="bg-gray-700 w-full p-2 text-gray-500"
                            placeholder="Time Tracked"
                            value={formik.values.timeTracked || formatTime(time)}
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

                        <div className='border rounded-md p-2'>
                            <p>Time Tracked Details</p>
                            {timeTrackeddata.map((value, index) => {
                                return (
                                    <div key={index}>
                                        {value.byDate.map((value, index) => {
                                            return (
                                                <div key={index} className='flex justify-between'>
                                                    <p>Date :-{new Date(value.date).toLocaleDateString()} </p>
                                                    <p>Time :- {`${value.hours}H ${value.minutes}M`}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        {
                            timeTrackeddata.map((value, index) => {
                                return (
                                    <p>Task Total Timer :- {`${value.overall.hours}H :${value.overall.minutes}M`}</p>
                                );
                            })
                        }
                        <div className="flex justify-between items-center mb-4">
                            <div>Time :- </div>
                            <div className="text-3xl font-semibold">{formatTime(time)}</div>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                onClick={handlePlayPause}
                                className={`px-6 py-2 rounded-lg text-white ${isRunning ? 'bg-rose-600' : 'bg-green-500'}`}
                            >
                                {isRunning ? 'Stop' : 'Start'}
                            </button>
                            <button className='px-6 py-2 rounded-lg text-white bg-authbutton' type='submit' onClick={formik.handleSubmit}>
                                sava Time
                            </button>
                        </div>
                    </div>
                }
            />

        </>
    );
};


