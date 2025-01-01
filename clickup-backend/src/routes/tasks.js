import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { lists, tasks, tags, users } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/:listUUID - POST - create a task
 */
app.post("/auth/:listUUID", async (res) => {
    try {
        const body = res.get("body");
        // const body = req.body;

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const listUUID = res.req.param("listUUID");

        const list = await findOne(lists, "uuid", listUUID);

        if (list == null) {
            return res.json(errorBody("List doesn't exists"), 404);
        }

        const task = await tasks.create({
            ...body,
            listId: list.id,
        });

        // console.log(body, "body");

        return res.json({ res: task });
    }
    catch (e) {
        logError(e.toString(), "/tasks/auth/:listUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:taskUUID - PUT - update task
 */
app.put("/auth/:taskUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['status', 'name', 'dueDate', 'startDate', 'endDate', 'timeTracked', 'timeEstimate', 'totalTime', 'description'],
            mustBeNullFields: defaultNullFields,
        });

        const taskUUID = res.req.param("taskUUID");

        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);
        }

        const updatedTask = await update(tasks, "id", task.id, body);

        return res.json({ res: updatedTask });
    }
    catch (e) {
        logError(e.toString(), "/tasks/auth/:taskUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/list/:listUUID/all - GET - get all tasks of list
 */
app.get("/auth/list/:listUUID/all", async (res) => {
    try {
        const listUUID = res.req.param("listUUID");

        const list = await findOne(lists, "uuid", listUUID);

        if (list == null) {
            return res.json(errorBody("List doesn't exists"), 404);
        }

        const tasksData = await tasks.findAll({
            where: {
                listId: list.id,
            },
            include: [
                { model: tags, as: 'tags', through: { attributes: [] } },
                { model: users, as: 'assignees', through: { attributes: [] } },
            ],
        });

        return res.json({ res: tasksData });
    }
    catch (e) {
        logError(e.toString(), "/tasks/auth/list/:listUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;