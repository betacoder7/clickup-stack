import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import users from "./routes/users";
import workspaces from "./routes/workspaces";
import spaces from "./routes/spaces";
import folders from "./routes/folders";
import lists from "./routes/lists";
import tags from "./routes/tags";
import tasks from "./routes/tasks";
import subtasks from "./routes/subtasks";
import microtasks from "./routes/microtasks";
import assignees from "./routes/assignees";
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.use("*", logger());

app.use('*',
  cors({
    origin:
      ['http://localhost:3000'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.get(
  '/static/*',
  serveStatic({
    root: "./",
  })
);

app.route("/users", users);
app.route("/workspaces", workspaces);
app.route("/spaces", spaces);
app.route("/folders", folders);
app.route("/lists", lists);
app.route("/tasks", tasks);
app.route("/tags", tags);
app.route("/subtasks", subtasks);
app.route("/microtasks", microtasks);
app.route("/assignees", assignees);

export default {
  port: 4000,
  fetch: app.fetch,
};