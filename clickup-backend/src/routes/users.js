import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";
import { v1 as uuidv1 } from "uuid";

import { users } from "../../models";

import { nullCheck, defaultNullFields } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import { findOne, update } from "../global/functions/modelOperations";
import * as bcrypt from "../global/functions/bcrypt";
import Jwt from "../global/middlewares/jwt";
import logError from "../global/functions/log";
import { sign } from "hono/jwt";
import { Op } from "sequelize";
import { Hono } from "hono";
import { validateImage } from "../global/validations/image";
import { updateFile, writeFile } from "../global/functions/storage";
import getQueries from "../global/functions/getQueries";

const app = new Hono();
app.router = new RegExpRouter();

app.use("auth/*", Jwt());

app.use("*", bodyParser());

/**
 * / - POST - create a user
 */
app.post("/", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['email', 'password', 'fullName'],
            mustBeNullFields: defaultNullFields,
        });

        const data = await findOne(users, "email", body.email);

        if (data != null) {
            return res.json(errorBody("User already exists"), 409);
        }

        if (body.image != null) {
            validateImage(body.image, 'image', 'image');

            const path = await writeFile(uuidv1(), 'users', body.image);

            body.image = path;
        }

        const hashedPassword = await bcrypt.hashPassword(body.password);

        const user = await users.create({
            ...body,
            password: hashedPassword,
        });

        return res.json({ res: user, image: body.image });
    }
    catch (e) {
        logError(e.toString(), "/users/", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/ - GET - get a user
 */
app.get("/auth/", async (res) => {
    try {
        const payload = res.get("jwtPayload");

        const uuid = payload.uuid;
        const user = await findOne(users, "uuid", uuid);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        return res.json({ res: user });
    }
    catch (e) {
        logError(e.toString(), "/users/auth/", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /login - POST - login a user
 */
app.post("/login", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            nonNullableFields: ['email', 'password'],
            mustBeNullFields: defaultNullFields,
        });

        const user = await findOne(users, "email", body.email);

        if (user == null) {
            return res.json(errorBody("User doesn't exists"), 404);
        }

        const match = await bcrypt.comparePassword(user.password, body.password);

        if (!match) {
            return res.json(errorBody("Incorrect password!"), 403);
        }

        const payload = {
            uuid: user.uuid,
            fullName: user.fullName,
        };

        const token = await sign(payload, Bun.env.JWT_SECRET);

        return res.json({ user: user, token: token });
    }
    catch (e) {
        logError(e.toString(), "/users/login", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /auth/ - PUT - update a user
 */
app.put("/auth/", async (res) => {
    try {
        const body = res.get("body");

        nullCheck(body, {
            bothCannotBeNull: ["fullName", "email", "image"],
            mustBeNullFields: [...defaultNullFields, "password"],
        });

        const user = res.get("user");

        if (body.image != null) {
            validateImage(body.image, 'image', 'image');

            const prevImage = user.image;

            const path = prevImage == null ? await writeFile(uuidv1(), 'users', body.image) : await updateFile(prevImage, body.image, uuidv1(), 'users');

            body.image = path;
        }

        const jwt = res.get("jwtPayload");

        const userData = await update(users, "uuid", jwt.uuid, body);

        return res.json({ res: userData, image: body.image });
    }
    catch (e) {
        logError(e.toString(), "/users/login", "POST");
        return res.json(errorBody(e.message), 400);
    }
});

/**
 * /search/:text - GET - search users by term
 */
app.get("/search/:text", async (res) => {
    try {
        const { limit, offset, sort } = getQueries(res.req.queries(), { 'limit': '10', 'offset': '0', 'sort': 'ASC' });

        const text = res.req.param("text");

        const userData = await users.findAll({
            where: {
                [Op.or]: [
                    { email: { [Op.like]: `%${text}%` }, },
                    { fullName: { [Op.like]: `%${text}%` }, },
                ],
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', sort]],
        });

        return res.json({ res: userData });
    }
    catch (e) {
        logError(e.toString(), "/users/search/:text", "GET");
        return res.json(errorBody(e.message), 400);
    }
});

export default app;