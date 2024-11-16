import { createMiddleware } from "hono/factory";
import { errorBody } from "../functions/errorBody";
import { verify } from "hono/jwt";
import { getSignedCookie } from "hono/cookie";
import { findOne } from "../functions/modelOperations";
import { users } from "../../../models";

const Jwt = () => {
    return createMiddleware(async (res, next) => {
        try {
            const token = res.req.header("Authorization").split(" ")[1];

            const value = await verify(token, Bun.env.JWT_SECRET);

            res.set("jwtPayload", value);

            const user = await findOne(users, "uuid", value.uuid);

            res.set("user", user);

            if (user == null) {
                return res.json(errorBody("Unauthorized"), 401);
            }

            await next();
        }
        catch (e) {
            try {
                const token = await getSignedCookie(res, Bun.env.SIGNED_COOKIE_SECRET, "jwt");

                const value = await verify(token, Bun.env.JWT_SECRET);

                res.set("jwtPayload", value);

                const user = await findOne(users, "uuid", value.uuid);

                if (user == null) {
                    return res.json(errorBody("Unauthorized"), 401);
                }

                await next();
            }
            catch (e) {
                return res.json(errorBody("Unauthorized"), 401);
            }
        }
    });
};

export default Jwt;