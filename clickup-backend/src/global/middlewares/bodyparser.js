import { createMiddleware } from "hono/factory";
import { errorBody } from "../functions/errorBody";
import processBody from "../functions/processbody";

const bodyParser = () => {
    return createMiddleware(async (res, next) => {
        let contentType = res.req.header()['content-type'];

        if (contentType == undefined) {
            return await next();
        }

        contentType = contentType.split(';')[0];
        let body;

        switch (contentType) {
            case 'application/json':
                body = await res.req.json();
                break;
            case 'multipart/form-data':
                body = await res.req.parseBody({ all: true });
                body = processBody(body);
                break;
            default:
                return res.json(errorBody("Invalid Content Type"), 400);
        }

        res.set("body", body);
        await next();
    });
};

export default bodyParser;