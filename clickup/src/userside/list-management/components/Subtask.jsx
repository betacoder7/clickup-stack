import React, { useState } from 'react';
import Commantaskfrom from './Commantaskfrom';
import IconButton from '../../dashboard/components/icon-button';
import { useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as BigDialogSlice from "../../../utilities/redux/slices/bigdialog";
import * as LoadingBar from "../../../utilities/redux/slices/toploading-bar";

import * as Yup from "yup";
import { useFormik } from 'formik';
import * as Alertdialog from "../../../utilities/redux/slices/alertdialog";
import SubtaskSlice from "../../../utilities/redux/slices/subtask";
import { useParams } from 'react-router-dom';

import fetch from "../../../utilities/axios/manager";
import { addAssignsubtask } from '../../../utilities/redux/slices/subtaskassigns';
import { addtagsubtask } from '../../../utilities/redux/slices/subtasktag';

const Subtask = ({ taskUUID, taskId }) => {
    const dispatcher = useDispatch();

    const { listUUID } = useParams();
    // console.log(listUUID, "listUUID");
    // console.log(taskUUID, "task uuid");

    const [assignees, setAssignees] = useState([]);
    const [tags, setTags] = useState([]);

    // console.log(tags, "tags");


    const formik = useFormik({
        initialValues: {
            name: "",
            status: "TODO",
            description: null,
            dueDate: null,
            StartDate: null,
            Enddate: null,
            timeTracked: null,
            timeEstimate: null,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            // console.log('Form Submitted:', values);
            await createTask();
        },
    });

    let subtaskUUID;

    async function createTask() {
        dispatcher(LoadingBar.setProgress(50));

        const body = {
            taskId: taskId,
            name: formik.values.name,
            description: formik.values.description,
            status: formik.values.status,
            dueDate: formik.values.dueDate ? new Date(formik.values.dueDate).toISOString() : null,
            startDate: formik.values.StartDate ? new Date(formik.values.StartDate).toISOString() : null,
            endDate: formik.values.Enddate ? new Date(formik.values.Enddate).toISOString() : null,
            timeTracked: formik.values.timeTracked,
            timeEstimate: formik.values.timeEstimate,
        };

        const [subtaskData, subtaskError] = await fetch({
            route: `/subtasks/auth/${taskUUID}`,
            requestType: "post",
            body: body,
        });

        if (subtaskError != null) {
            return onError(subtaskError, createTask);
        }

        console.log(subtaskData, "task Date");

        const createsubtaskID = subtaskData["res"];
        subtaskUUID = createsubtaskID.uuid;

        dispatcher(LoadingBar.setProgress(100));

        dispatcher(SubtaskSlice.add({ subtask: subtaskData["res"], taskUUID: listUUID }));


        subtaskassignee();
        subtasktag();

        dispatcher(BigDialogSlice.hide());
    }

    async function subtaskassignee() {

        assignees.map(async (value) => {
            console.log(value.uuid, "value.uuid");

            const [subtaskassigneeData, subtaskassigneeError] = await fetch({
                route: `/assignees/auth/subtask/${subtaskUUID}/user/${value.uuid}`,
                requestType: "post",
            });

            if (subtaskassigneeError != null) {
                return onError(subtaskassigneeData, subtaskassignee);
            }

            if (subtaskassigneeData) {
                dispatcher(addAssignsubtask({ subtaskUUID: subtaskUUID, userUUID: value.uuid, assignment: subtaskassigneeData }));
            }
        });

    }

    // subtaskassignee();

    async function subtasktag() {
        tags.map(async (value, index) => {
            console.log(value.uuid, "tag uuid");

            const [subtasktag, subtasktagError] = await fetch({
                route: `/tags/auth/subtask/${subtaskUUID}/tag/${value.uuid}`,
                requestType: "post",
            });

            if (subtasktagError != null) {
                return onError(subtasktagError, subtasktag);
            }

            if (subtasktag) {
                dispatcher(addtagsubtask({ subtaskUUID: subtaskUUID, tagUUID: value.uuid, tags: subtasktag }));
            }
        });
    }

    // subtasktag();


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
            <div className="flex flex-col gap-5 text-white">
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-semibold text-md">SubTask</h1>
                    <IconButton className="h7 w-7 p-1" onClick={() => dispatcher(BigDialogSlice.hide())} icon={<XMarkIcon className="h-full w-full" />} />
                </div>
                <Commantaskfrom
                    formik={formik}
                    assignees={assignees}
                    setAssignees={setAssignees}
                    tags={tags}
                    setTags={setTags}
                />
            </div>
        </>
    );
};

export default Subtask;