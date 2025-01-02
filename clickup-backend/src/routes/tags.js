import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { tags, tasktags, workspaces, tasks, subtasks, subtasktag } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { destroy, findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";
import { Op } from "sequelize";
// import subtasks from "../../models/subtasks";
// import subtasktag from "../../models/subtasktag";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/workspace/:workspaceUUID - POST - create a tag for workspace
 */
app.post("/auth/workspace/:workspaceUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name', 'textColor', 'backgroundColor'],
            mustBeNullFields: defaultNullFields,
        });

        const workspaceUUID = res.req.param("workspaceUUID");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        const tag = await tags.create({
            ...body,
            workspaceId: workspace.id,
        });

        return res.json({ res: tag });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/workspace/:workspaceUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:tagUUID - PUT - update tag
 */
app.put("/auth/:tagUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['name', 'textColor', 'backgroundColor'],
            mustBeNullFields: [...defaultNullFields, 'workspaceId'],
        });

        const tagUUID = res.req.param("tagUUID");

        const tag = await findOne(tags, "uuid", tagUUID);

        if (tag == null) {
            return res.json(errorBody("Tag doesn't exists"), 404);
        }

        const updatedTag = await update(tags, "id", tag.id, body);

        return res.json({ res: updatedTag });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/:tagUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:tagUUID - DELETE - delete a tag
 */
app.delete("/auth/:tagUUID", async (res) => {
    try {
        const tagUUID = res.req.param("tagUUID");

        const tag = await findOne(tags, "uuid", tagUUID);

        if (tag == null) {
            return res.json(errorBody("Tag doesn't exists"), 404);
        }

        await destroy(tags, "id", tag.id);

        await destroy(tasktags, "tagId", tag.id);

        return res.json({ res: "Tag deleted" });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/:tagUUID", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/workspace/:workspaceUUID/all - GET - get all tags of workspace
 */
app.get("/auth/workspace/:workspaceUUID/all", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        const tagsData = await tags.findAll({
            where: {
                workspaceId: workspace.id,
            }
        });

        return res.json({ res: tagsData });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/workspace/:workspaceUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/workspace/:workspaceUUID/search/:text - GET - search tags of workspace
 */
app.get("/auth/workspace/:workspaceUUID/search/:text", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");
        const text = res.req.param("text");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        const tagsData = await tags.findAll({
            where: {
                workspaceId: workspace.id,
                [Op.or]: [
                    { name: { [Op.like]: `%${text}%` }, },
                ],
            }
        });

        return res.json({ res: tagsData });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/workspace/:workspaceUUID/search/:text", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/task/:taskUUID/tag/:tagUUID - POST - add a tag in task
 */
app.post("/auth/task/:taskUUID/tag/:tagUUID", async (res) => {
    try {
        const taskUUID = res.req.param("taskUUID");
        const tagUUID = res.req.param("tagUUID");

        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);
        }

        const tag = await findOne(tags, "uuid", tagUUID);

        if (tag == null) {
            return res.json(errorBody("Tag doesn't exists"), 404);
        }

        const prevData = await tasktags.findOne({
            where: {
                tagId: tag.id,
                taskId: task.id,
            }
        });

        if (prevData != null) {
            return res.json(errorBody("Tag already exists"), 409);
        }

        const data = await tasktags.create({
            tagId: tag.id,
            taskId: task.id,
        });

        return res.json({ res: data });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/task/:taskUUID/tag/:tagUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/task/:taskUUID/tag/:tagUUID - DELETE - remove a tag in task
 */
app.delete("/auth/task/:taskUUID/tag/:tagUUID", async (res) => {
    try {
        const taskUUID = res.req.param("taskUUID");
        const tagUUID = res.req.param("tagUUID");

        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task doesn't exists"), 404);
        }

        const tag = await findOne(tags, "uuid", tagUUID);

        if (tag == null) {
            return res.json(errorBody("Tag doesn't exists"), 404);
        }

        await tasktags.destroy({
            where: {
                tagId: tag.id,
                taskId: task.id,
            }
        });

        return res.json({ res: "Tag removed" });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/task/:taskUUID/tag/:tagUUID", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/task/:taskUUID/tag/:tagUUID - POST - add a tag in subtask
 */
app.post("/auth/subtask/:subtaskUUID/tag/:tagUUID", async (res) => {
    try {
        const subtaskUUID = res.req.param("subtaskUUID");
        const tagUUID = res.req.param("tagUUID");

        console.log(subtaskUUID, tagUUID, "tagUUIDtagUUIDtagUUIDtagUUIDtagUUID");


        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("SubTask doesn't exists"), 404);
        }

        const tag = await findOne(tags, "uuid", tagUUID);

        if (tag == null) {
            return res.json(errorBody("Tag doesn't exists"), 404);
        }

        const prevData = await subtasktag.findOne({
            where: {
                tagId: tag.id,
                subtaskId: subtask.id,
            }
        });

        if (prevData != null) {
            return res.json(errorBody("Tag already exists"), 409);
        }

        const data = await subtasktag.create({
            tagId: tag.id,
            subtaskId: subtask.id,
        });

        return res.json({ res: data });
    } catch (e) {
        logError(e.toString(), "/tags/auth/subtask/:subtaskUUID/tag/:tagUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/task/:taskUUID/tag/:tagUUID - DELETE - remove a tag in subtask
 */

app.delete("/auth/subtask/:subtaskUUID/tag/:tagUUID", async (res) => {
    try {
        const subtaskUUID = res.req.param("subtaskUUID");
        const tagUUID = res.req.param("tagUUID");

        const subtask = await findOne(subtasks, "uuid", subtaskUUID);

        if (subtask == null) {
            return res.json(errorBody("SubTask doesn't exists"), 404);
        }

        const tag = await findOne(tags, "uuid", tagUUID);

        if (tag == null) {
            return res.json(errorBody("Tag doesn't exists"), 404);
        }

        await tasktags.destroy({
            where: {
                tagId: tag.id,
                subtaskId: subtask.id,
            }
        });

        return res.json({ res: "Tag removed" });
    }
    catch (e) {
        logError(e.toString(), "/tags/auth/subtask/:subtaskUUID/tag/:tagUUID", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});


export default app;