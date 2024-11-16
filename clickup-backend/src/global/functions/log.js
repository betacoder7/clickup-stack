import { appendFileSync } from 'fs';

const logError = (error, route, request) => {
    appendFileSync("logs/error.log", `${new Date().toTimeString()} - ${route} - ${request} - ${error}\n`);
};

export default logError;