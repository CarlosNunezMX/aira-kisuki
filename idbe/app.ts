import { Hono } from "hono";
import { logger } from "hono/logger";
const app = new Hono();

import { maintenanceMode } from "../maintenanceMode"
import { AiraRouter } from "./router";
import { serveStatic } from "hono/bun";
import { PublicSettings } from "../utils/public";
import { IndexView } from "../views";

app.use('*', maintenanceMode);
app.use("*", logger((str) => {
    console.log(`[Aira] ${str}`)
}))
app.use("/public/*", serveStatic(PublicSettings))
app.route("/", AiraRouter)

app.get("/", c => {
    return c.html(IndexView())
})

console.log("[Aira] - Server started!")

export default app;