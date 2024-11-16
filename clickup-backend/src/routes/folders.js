import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";
import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { spaces, folders } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";


const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/:spaceUUID - POST - create a folder
 */
app.post("/auth/:spaceUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const spaceUUID = res.req.param("spaceUUID");
        console.log(spaceUUID, "spaceUUID");


        const spaceData = await findOne(spaces, "uuid", spaceUUID);
        console.log(spaceData, "spaceData");


        if (spaceData == null) {
            return res.json(errorBody("Space doesn't exists"), 404);
        }

        const folder = await folders.create({
            ...body,
            spaceId: spaceData.id
        });

        return res.json({ res: folder });
    }
    catch (e) {
        logError(e.toString(), "/folders/auth/:spaceUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:folderUUID - PUT - update folder
 */
app.put("/auth/:folderUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['name'],
            mustBeNullFields: defaultNullFields,
        });

        const folderUUID = res.req.param("folderUUID");

        const folder = await findOne(folders, "uuid", folderUUID);

        if (folder == null) {
            return res.json(errorBody("Folder doesn't exists"), 404);
        }

        const updatedfolder = await update(folders, "id", folder.id, body);

        return res.json({ res: updatedfolder });
    }
    catch (e) {
        logError(e.toString(), "/folders/auth/:folderUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/space/:spaceUUID/all - GET - get all folders of space
 */
app.get("/auth/space/:spaceUUID/all", async (res) => {
    try {
        const spaceUUID = res.req.param("spaceUUID");

        const space = await findOne(spaces, "uuid", spaceUUID);

        if (space == null) {
            return res.json(errorBody("Space doesn't exists"), 404);
        }

        const foldersData = await folders.findAll({
            where: {
                spaceId: space.id,
            }
        });

        return res.json({ res: foldersData });
    }
    catch (e) {
        logError(e.toString(), "/folders/auth/space/:spaceUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;