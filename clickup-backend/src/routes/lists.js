import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { folders, lists } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/:folderUUID - POST - create a list
 */
app.post("/auth/:folderUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const folderUUID = res.req.param("folderUUID");

        const folder = await findOne(folders, "uuid", folderUUID);

        if (folder == null) {
            return res.json(errorBody("Folder doesn't exists"), 404);
        }

        const list = await lists.create({
            ...body,
            folderId: folder.id
        });

        return res.json({ res: list });
    }
    catch (e) {
        logError(e.toString(), "/lists/auth/:folderUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:listUUID - PUT - update list
 */
app.put("/auth/:listUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const listUUID = res.req.param("listUUID");

        const list = await findOne(lists, "uuid", listUUID);

        if (list == null) {
            return res.json(errorBody("List doesn't exists"), 404);
        }

        const updatedList = await update(lists, "id", list.id, body);

        return res.json({ res: updatedList });
    }
    catch (e) {
        logError(e.toString(), "/lists/auth/:listUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/folder/:listUUID/all - GET - get all lists of folder
 */
app.get("/auth/folder/:folderUUID/all", async (res) => {
    try {
        const folderUUID = res.req.param("folderUUID");

        const folder = await findOne(folders, "uuid", folderUUID);

        if (folder == null) {
            return res.json(errorBody("Folder doesn't exists"), 404);
        }

        const listsData = await lists.findAll({
            where: {
                folderId: folder.id,
            }
        });

        return res.json({ res: listsData });
    }
    catch (e) {
        logError(e.toString(), "/lists/auth/folder/:folderUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;