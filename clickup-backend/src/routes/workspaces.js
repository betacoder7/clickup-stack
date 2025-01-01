import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { v1 as uuidv1 } from "uuid";
import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { workspaces, workspaceAccesses, users } from "../../models";
import Jwt from "../global/middlewares/jwt";
import { validateImage } from "../global/validations/image";
import { updateFile, writeFile } from "../global/functions/storage";
import { findOne, update } from "../global/functions/modelOperations";
import { Hono } from "hono";
import logError from "../global/functions/log";
import { Op } from "sequelize";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * /auth/ - POST - create a workspace
 */
app.post("/auth/", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['name'],
            mustBeNullFields: [...defaultNullFields, "userId"],
        });

        const user = res.get("user");

        if (body.image != null) {
            validateImage(body.image, 'image', 'image');

            const path = await writeFile(uuidv1(), 'workspaces', body.image);

            body.image = path;
        }

        const workspace = await workspaces.create({
            ...body,
            userId: user.id,
        });

        await workspaceAccesses.create({
            workspaceId: workspace.id,
            userId: user.id,
            isAdmin: 1,
        });

        return res.json({ res: workspace });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:workspaceUUID - PUT - update a workspace
 */
app.put("/auth/:workspaceUUID", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ['name', 'image', 'description'],
            mustBeNullFields: [...defaultNullFields, "userId"],
        });

        const user = res.get("user");

        const workspaceUUID = res.req.param("workspaceUUID");

        const workspaceData = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspaceData == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        if (workspaceData.userId != user.id) {
            return res.json(errorBody("Not allowed"), 403);
        }

        if (body.image != null) {
            validateImage(body.image, 'image', 'image');

            const prevImage = workspaceData.image;

            const path = prevImage == null ? await writeFile(uuidv1(), 'workspaces', body.image) : await updateFile(prevImage, body.image, uuidv1(), 'workspaces');

            body.image = path;
        }

        const updatedWorkspace = await update(workspaces, "id", workspaceData.id, body);

        return res.json({ res: updatedWorkspace, image: body.image });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/:workspaceUUID", "PUT");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:workspaceUUID/access/:uuid - DELETE - revoke access of workspace to user
 */
app.delete("/auth/:workspaceUUID/access/:uuid", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");
        const uuid = res.req.param("uuid");

        const user = res.get("user");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        if (workspace.userId != user.id) {
            return res.json(errorBody("Not allowed"), 403);
        }

        const newUser = await findOne(users, "uuid", uuid);

        if (newUser == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        await workspaceAccesses.destroy({
            where: {
                workspaceId: workspace.id,
                userId: newUser.id,
            },
        });

        return res.json({ res: "Access revoked" });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/:workspaceUUID/access/:uuid", "DELETE");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:workspaceUUID/access/:uuid - POST - give access of workspace to user
 */
app.post("/auth/:workspaceUUID/access/:uuid", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");
        const uuid = res.req.param("uuid");

        const user = res.get("user");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        if (workspace.userId != user.id) {
            return res.json(errorBody("Not allowed"), 403);
        }

        const newUser = await findOne(users, "uuid", uuid);

        if (newUser == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const prevItem = await workspaceAccesses.findOne({
            where: {
                workspaceId: workspace.id,
                userId: newUser.id,
            }
        });

        if (prevItem != null) {
            return res.json(errorBody("Already given"), 409);
        }

        await workspaceAccesses.create({
            workspaceId: workspace.id,
            userId: newUser.id,
            isAdmin: 0,
        });

        return res.json({ res: "Access given" });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/:workspaceUUID/access/:uuid", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:workspaceUUID/access - GET - get all users that has access to workspace
 */
app.get("/auth/:workspaceUUID/access", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");

        const user = res.get("user");

        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        if (workspace.userId != user.id) {
            return res.json(errorBody("Not allowed"), 403);
        }

        const workspaceData = await workspaceAccesses.findAll({
            where: {
                workspaceId: workspace.id,
            },
            include: { model: users, required: true },
        });

        const usersData = workspaceData.map(item => item.user);

        return res.json({ res: usersData });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/:workspaceUUID/access", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/:workspaceUUID/access/search/:text - GET - search users that has access to workspace
 */
app.get("/auth/:workspaceUUID/access/search/:text", async (res) => {
    try {
        const workspaceUUID = res.req.param("workspaceUUID");

        const user = res.get("user");

        const text = res.req.param("text");
        console.log(text, "text");


        const workspace = await findOne(workspaces, "uuid", workspaceUUID);

        if (workspace == null) {
            return res.json(errorBody("Workspace doesn't exists"), 404);
        }

        if (workspace.userId != user.id) {
            return res.json(errorBody("Not allowed"), 403);
        }

        const workspaceData = await workspaceAccesses.findAll({
            where: {
                workspaceId: workspace.id,
            },
            include: {
                model: users,
                required: true,
                where: {
                    [Op.or]: [
                        { email: { [Op.like]: `%${text}%` }, },
                        { fullName: { [Op.like]: `%${text}%` }, },
                    ]
                }
            },
        });

        const usersData = workspaceData.map(item => item.user);
        console.log(usersData, "usersData");
        return res.json({ res: usersData });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/:workspaceUUID/access/search/:text", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/all - GET - get all workspaces user is allowed
 */
app.get("/auth/all", async (res) => {
    try {
        const user = res.get("user");

        const usersData = await workspaceAccesses.findAll({
            where: {
                userId: user.id,
            },
            include: { model: workspaces },
        });

        const workspacesData = usersData.map(item => item.workspace);

        return res.json({ res: workspacesData });
    }
    catch (e) {
        logError(e.toString(), "/workspaces/auth/all", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;