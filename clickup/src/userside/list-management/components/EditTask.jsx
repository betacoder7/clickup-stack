import React, { useState } from 'react';
import Commantaskfrom from './Commantaskfrom';

import { useFormik } from "formik";
import IconButton from "../../dashboard/components/icon-button";

import { useDispatch, useSelector } from "react-redux";
import fetch from "../../../utilities/axios/manager";

// import Assignee from "../../../assets/SVGs/assignees.svg";
// import HourGlassIcon from "../../../assets/SVGs/hourglass.svg";
// import Stopwatch from "../../../assets/SVGs/stopwatch.svg";
// import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline";

import * as Yup from "yup";
import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import * as TaskSlice from "../../../utilities/redux/slices/tasks";
import * as AssignsSlice from "../../../utilities/redux/slices/taskassigns";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useParams } from 'react-router-dom';

const EditTask = ({task}) => {
    const dispatcher = useDispatch();

    const listUUID = useParams()
    const tasks = useSelector(state => state.taskSlice.tasks[listUUID]);
    const [assignees, setAssignees] = useState([]);
    const [tags, setTags] = useState([]);

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
        onSubmit: async (values) => {
            console.log('Form Submitted:', values);
            await updateTask();
        },
    });

    async function updateTask() {
        dispatcher(LoadingBar.setProgress(50));

        const [, taskError] = await fetch({
            route: `/tasks/auth/${task.uuid}`,
            requestType: "put",
            body: {
                name: formik.values.name,
                description: formik.values.description,
                status: formik.values.status,
                dueDate: formik.values.dueDate ? new Date(formik.values.dueDate).toISOString() : null,
                startDate: formik.values.StartDate ? new Date(formik.values.StartDate).toISOString() : null,
                endDate: formik.values.Enddate ? new Date(formik.values.Enddate).toISOString() : null,
                timeEstimate: formik.values.timeEstimate,
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

    return (
        <>
            <Commantaskfrom
                formik={formik}
                assignees={assignees}
                setAssignees={setAssignees}
                tags={tags}
                setTags={setTags}
            />
        </>
    );
};

export default EditTask;