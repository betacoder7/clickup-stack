import { RegExpRouter } from "hono/router/reg-exp-router";
import bodyParser from "../global/middlewares/bodyparser";

import { Hono } from "hono";
import Jwt from "../global/middlewares/jwt";
import { defaultNullFields, nullCheck } from "../global/validations/nullCheck";
import { errorBody } from "../global/functions/errorBody";
import logError from "../global/functions/log";
import { findOne } from "../global/functions/modelOperations";
import { timeTrackeds, tasks } from "../../models";

const app = new Hono();

app.router = new RegExpRouter();

// app.use("auth/*", Jwt());

app.use("*", bodyParser());

/** 
 * /auth/:taskID - post -create a task  time tracked
*/

app.post("/auth/time/:taskUUID", async (res) => {
    try {
        const body = res.get("body");
        // console.log(body, "bodybodybodybody");

        const { date, duration } = body;

        if (!date || !duration) {
            return res.json(errorBody("date and duration are required"), 404);
        }

        const taskUUID = res.req.param("taskUUID");
        // console.log("TaskUUID: ==============>", taskUUID);

        const task = await findOne(tasks, "uuid", taskUUID);

        // console.log("Found Task: ===================>", task);

        if (task == null) {
            return res.json(errorBody("Task not found"), 404);
        }

        const timeTrackeddata = await timeTrackeds.create({
            ...body,
            taskId: task.id,
        });

        // console.log(timeTrackeddata, "timeTrackeddata");

        return res.json({ res: timeTrackeddata });

    } catch (e) {
        logError(e.toString(), "/timeTracked/auth/time/:taskUUID", "POST");
        return res.json((errorBody(e.message), 400));
    }
});

app.get("/auth/totaltime/:taskUUID", async (res) => {
    try {
        const taskUUID = res.req.param("taskUUID");
        const task = await findOne(tasks, "uuid", taskUUID);

        if (task == null) {
            return res.json(errorBody("Task not found"), 404);
        }

        const timeTracked = await timeTrackeds.findAll({
            where: {
                taskId: task.id,
            },
        });

        console.log(timeTracked, "timeTrackedtimeTrackedtimeTracked");


        if (timeTracked == null) {
            return res.json(errorBody("timeTracked doesn't exists "), 404);
        }

        // Aggregate durations by date and calculate overall total hours and minutes
        const totalDurations = [];
        let overallHours = 0;
        let overallMinutes = 0;

        timeTracked.forEach(entry => {
            const { date, duration } = entry;

            // Extract hours and minutes from the duration
            const [hours, minutes] = duration.match(/(\d+)h (\d+)m/).slice(1).map(Number);

            // Find existing entry for the date or create a new one
            const existing = totalDurations.find(item => item.date === date);
            if (existing) {
                existing.hours += hours;
                existing.minutes += minutes;
            } else {
                totalDurations.push({ date, hours, minutes });
            }

            // Update overall totals
            overallHours += hours;
            overallMinutes += minutes;
        });

        // Normalize minutes to hours if >= 60
        totalDurations.forEach(entry => {
            entry.hours += Math.floor(entry.minutes / 60);
            entry.minutes %= 60;
        });

        // Normalize overall minutes to hours if >= 60
        overallHours += Math.floor(overallMinutes / 60);
        overallMinutes %= 60;

        const response = [
            {
                byDate: totalDurations,
                overall: {
                    hours: overallHours,
                    minutes: overallMinutes
                }
            }
        ];
        console.log(response, "responseresponseresponseresponse");
        return res.json({ res: response });

    } catch (e) {
        logError(e.toString(), "/timeTracked/auth/totaltime/:taskUUID", "get");
        return res.json(errorBody(e.message), 400);
    }
});





// app.patch("/auth/totaltimeupdata/:timeTrackedUUID", async (res) => {
//     try {

//         const body = res.get("body");
//         const timeTrackedUUID = req.param("timeTrackedUUID");

//         nullCheck(body, {
//             bothCannotBeNull: ['date', 'duration'],
//             mustBeNullFields: defaultNullFields,
//         });

//         const TimeTracked = await timeTracked.findOne({ where: { uuid: timeTrackedUUID } });
//         if (!timeTracked) {
//             return res.json(errorBody("timeTrackedUUID doesn't exists"), 404);
//         }
//         // const updatedTimeTracked = await updata(timeTracked, "id", timeTracked.id ,body);

//         if (body.date) TimeTracked.date = body.date; // Update date if provided
//         if (body.duration) TimeTracked.duration = body.duration; // Update duration if provided

//         // Save the updated timeTracked entry
//         await timeTracked.save();


//         // Recalculate totalDuration for the task associated with this timeTracked entry
//         const taskTimeEntries = await timeTracked.findAll({
//             where: { taskId: timeTracked.taskId },
//         });

//         let totalDurationHours = 0;
//         let totalDurationMinutes = 0;

//         taskTimeEntries.forEach(entry => {
//             const [hours, minutes] = entry.duration.match(/(\d+)h (\d+)m/).slice(1).map(Number);
//             totalDurationHours += hours;
//             totalDurationMinutes += minutes;
//         });

//         // Normalize the totalDuration
//         totalDurationHours += Math.floor(totalDurationMinutes / 60);
//         totalDurationMinutes %= 60;

//         // Find the task associated with this timeTracked entry and update totalDuration
//         const task = await tasks.findByPk(timeTracked.taskId);
//         task.totalDuration = `${totalDurationHours}h ${totalDurationMinutes}m`;

//         // Save the updated task with new totalDuration
//         await task.save();

//         return res.json({
//             res: {
//                 taskId: timeTracked.taskId,
//                 data: {
//                     duration: timeTracked.duration,
//                     totalDuration: task.totalDuration,
//                 },
//             },
//         });
//     } catch (e) {
//         logError(e.toString(), "/timeTracked/auth/totaltimeupdata/:timeTrackedUUID", "PATCH");
//         return res.json(errorBody(e.message), 400);
//     }
// });

export default app;