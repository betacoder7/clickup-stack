import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { tasks, subtasks, users } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/:taskUUID - POST - create a subtask
 */
app.post("/auth/:taskUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const taskUUID = res.req.param("taskUUID");

        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);
        }

        const subtask = await subtasks.create({
            ...body,
            taskId: task.id
        });

        return res.json({ res: subtask });
    }
    catch (e) {
        logError(e.toString(), "/subtasks/auth/:taskUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:subtaskUUID - PUT - update subtask
 */
app.put("/auth/:subtaskUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['status', 'name', 'dueDate', 'startDate', 'endDate', 'timeTracked', 'timeEstimate'],
            mustBeNullFields: [...defaultNullFields, 'taskId'],
        });

        const subtaskUUID = res.req.param("subtaskUUID");

        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);
        }

        const updatedSubtask = await update(subtasks, "id", subtask.id, body);

        return res.json({ res: updatedSubtask });
    }
    catch (e) {
        logError(e.toString(), "/subtasks/auth/:subtaskUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/task/:taskUUID/all - GET - get all subtasks of task
 */
app.get("/auth/task/:taskUUID/all", async (res) => {
    try {
        const taskUUID = res.req.param("taskUUID");

        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);
        }

        const subtasksData = await subtasks.findAll({
            where: {
                taskId: task.id,
            },
            include: { model: users, as: 'assignees', through: { attributes: [] } },
        });

        return res.json({ res: subtasksData });
    }
    catch (e) {
        logError(e.toString(), "/subtasks/auth/task/:taskUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;