import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { v1 as uuidv1 } from "uuid";
import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { spaces, workspaces } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { validateImage } from "../global/validations/image";
import { updateFile, writeFile } from "../global/functions/storage";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/:workspaceUUID - POST - create a space
 */
app.post("/auth/:workspaceUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: [...defaultNullFields, "workspaceId"],
        });

        const workspaceUUID = res.req.param("workspaceUUID");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        if (body.image != null) {
            validateImage(body.image, 'image', 'image');

            const path = await writeFile(uuidv1(), 'spaces', body.image);

            body.image = path;
        }

        const space = await spaces.create({
            ...body,
            workspaceId: workspace.id
        });

        return res.json({ res: space });
    }
    catch (e) {
        logError(e.toString(), "/spaces/auth/:workspaceUUID", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:spaceUUID - PUT - update space
 */
app.put("/auth/:spaceUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['name', 'image'],
            mustBeNullFields: [...defaultNullFields, "workspaceId"],
        });

        const spaceUUID = res.req.param("spaceUUID");

        const space = await findOne(spaces, "uuid", spaceUUID);

        if (space == null) {
            return res.json(errorBody("Space doesn't exists"), 404);
        }

        if (body.image != null) {
            validateImage(body.image, 'image', 'image');

            const prevImage = space.image;

            const path = prevImage == null ? await writeFile(uuidv1(), 'spaces', body.image) : await updateFile(prevImage, body.image, uuidv1(), 'spaces');

            body.image = path;
        }

        const updatedSpaces = await update(spaces, "id", space.id, body);

        return res.json({ res: updatedSpaces, image: body.image });
    }
    catch (e) {
        logError(e.toString(), "/spaces/auth/:spaceUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/workspace/:workspaceUUID/all - GET - get all spaces of workspace
 */
app.get("/auth/workspace/:workspaceUUID/all", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        const spacesData = await spaces.findAll({
            where: {
                workspaceId: workspace.id,
            }
        });

        return res.json({ res: spacesData });
    }
    catch (e) {
        logError(e.toString(), "/spaces/auth/workspace/:workspaceUUID/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;