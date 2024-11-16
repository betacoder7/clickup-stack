import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { subtasks, microtasks, users } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/:subtaskUUID - POST - create a microtask
 */
app.post("/auth/:subtaskUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const subtaskUUID = res.req.param("subtaskUUID");

        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);
        }

        const microtask = await microtasks.create({
            ...body,
            subtaskId: subtask.id
        });

        return res.json({ res: microtask });
    }
    catch (e) {
        logError(e.toString(), "/microtasks/auth/:subtaskUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:microtaskUUID - PUT - update microtask
 */
app.put("/auth/:microtaskUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['status', 'name', 'dueDate', 'startDate', 'endDate', 'timeTracked', 'timeEstimate'],
            mustBeNullFields: [...defaultNullFields, 'subtaskId'],
        });

        const microtaskUUID = res.req.param("microtaskUUID");

        const microtask = await findOne(microtasks, "uuid", microtaskUUID);

        if (microtask == null) {
            return res.json(errorBody("Microtask doesn't exists"), 404);
        }

        const updatedMicrotask = await update(microtasks, "id", microtask.id, body);

        return res.json({ res: updatedMicrotask });
    }
    catch (e) {
        logError(e.toString(), "/microtasks/auth/:microtaskUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/subtask/:subtaskUUID/all - GET - get all microtasks of subtask
 */
app.get("/auth/subtask/:subtaskUUID/all", async (res) => {
    try {
        const subtaskUUID = res.req.param("subtaskUUID");

        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);
        }

        const microtasksData = await microtasks.findAll({
            where: {
                subtaskId: subtask.id,
            },
            include: { model: users, as: 'assignees', through: { attributes: [] } },
        });

        return res.json({ res: microtasksData });
    }
    catch (e) {
        logError(e.toString(), "/microtasks/auth/subtask/:subtaskUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;