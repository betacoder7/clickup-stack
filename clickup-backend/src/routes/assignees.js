import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { errorBody } from "../global/functions/errorBody";
import { users, taskassigns, tasks, subtasks, subtaskassigns, microtasks, microtaskassigns } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { findOne } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/task/:taskUUID/user/:uuid - POST - assign a task
 */
app.post("/auth/task/:taskUUID/user/:uuid", async (res) => {
    try {
        const taskUUID = res.req.param("taskUUID");
        const uuid = res.req.param("uuid");

        const task = await findOne(tasks, "uuid", taskUUID);
        console.log(task, "task");

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);;
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await taskassigns.findOne({
            where: {
                taskId: task.id,
                userId: user.id,
            }
        });

        if (prevData != null) {
            return res.json(errorBody("Already assigned"), 409);
        }

        const data = await taskassigns.create({
            taskId: task.id,
            userId: user.id,
        });

        return res.json({ res: data });
    }
    catch (e) {
        logError(e.toString(), "/assignees/auth/task/:taskUUID/user/:uuid", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

app.put("/auth/taskassignedupdata/:taskUUID/user/:uuid", async (res) => {
    try {
        const task = await findOne(tasks, "uuid", taskUUID);
        console.log(task, "task");

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);;
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await taskassigns.findOne({
            where: {
                taskId: task.id,
                userId: user.id,
            }
        });

        if (prevData != null) {
            return res.json(errorBody("Already assigned"), 409);
        }

        const data = taskassigns.updata({
            where: {
                taskId: task.id,
                userId: user.id,
            }
        });

        return res.json({ res: data });
    } catch (e) {
        logError(e.toString(), "/assignees/auth/taskassignedupdata/:taskUUID/user/:uuid", "put");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/task/:taskUUID/user/:uuid - POST - unassign a task
 */
app.delete("/auth/task/:taskUUID/user/:uuid", async (res) => {
    try {
        const taskUUID = res.req.param("taskUUID");
        const uuid = res.req.param("uuid");

        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);;
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await taskassigns.findOne({
            where: {
                taskId: task.id,
                userId: user.id,
            }
        });

        if (prevData == null) {
            return res.json(errorBody("Not assigned"), 409);
        }

        await taskassigns.destroy({
            where: {
                taskId: task.id,
                userId: user.id,
            }
        });

        return res.json({ res: "Task unassigned" });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/task/:taskUUID/user/:uuid", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/subtask/:subtaskUUID/user/:uuid - POST - assign a subtask
 */
app.post("/auth/subtask/:subtaskUUID/user/:uuid", async (res) => {
    try {
        const subtaskUUID = res.req.param("subtaskUUID");
        const uuid = res.req.param("uuid");

        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await subtaskassigns.findOne({
            where: {
                subtaskId: subtask.id,
                userId: user.id,
            }
        });

        if (prevData != null) {
            return res.json(errorBody("Already assigned"), 409);
        }

        const data = await subtaskassigns.create({
            subtaskId: subtask.id,
            userId: user.id,
        });

        return res.json({ res: data });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/subtask/:subtaskUUID/user/:uuid", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/subtask/:taskUUID/user/:uuid - POST - unassign a subtask
 */
app.delete("/auth/subtask/:subtaskUUID/user/:uuid", async (res) => {
    try {
        const subtaskUUID = res.req.param("subtaskUUID");
        const uuid = res.req.param("uuid");

        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);;
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await subtaskassigns.findOne({
            where: {
                subtaskId: subtask.id,
                userId: user.id,
            }
        });

        if (prevData == null) {
            return res.json(errorBody("Not assigned"), 409);
        }

        await subtaskassigns.destroy({
            where: {
                subtaskId: subtask.id,
                userId: user.id,
            }
        });

        return res.json({ res: "Subtask unassigned" });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/subtask/:subtaskUUID/user/:uuid", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/microtask/:microtaskUUID/user/:uuid - POST - assign a microtask
 */
app.post("/auth/microtask/:microtaskUUID/user/:uuid", async (res) => {
    try {
        const microtaskUUID = res.req.param("microtaskUUID");
        const uuid = res.req.param("uuid");

        const microtask = await findOne(microtasks, "uuid", microtaskUUID);

        if (microtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await microtaskassigns.findOne({
            where: {
                microtaskId: microtask.id,
                userId: user.id,
            }
        });

        if (prevData != null) {
            return res.json(errorBody("Already assigned"), 409);
        }

        const data = await microtaskassigns.create({
            microtaskId: microtask.id,
            userId: user.id,
        });

        return res.json({ res: data });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/microtask/:microtaskUUID/user/:uuid", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/microtask/:microtaskUUID/user/:uuid - POST - unassign a microtask
 */
app.delete("/auth/microtask/:microtaskUUID/user/:uuid", async (res) => {
    try {
        const microtaskUUID = res.req.param("microtaskUUID");
        const uuid = res.req.param("uuid");

        const microtask = await findOne(microtasks, "uuid", microtaskUUID);

        if (microtask == null) {
            return res.json(errorBody("Subtask doesn't exists"), 404);;
        }

        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevData = await microtaskassigns.findOne({
            where: {
                microtaskId: microtask.id,
                userId: user.id,
            }
        });

        if (prevData == null) {
            return res.json(errorBody("Not assigned"), 409);
        }

        await microtaskassigns.destroy({
            where: {
                microtaskId: microtask.id,
                userId: user.id,
            }
        });

        return res.json({ res: "Microtask unassigned" });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/microtask/:microtaskUUID/user/:uuid", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;