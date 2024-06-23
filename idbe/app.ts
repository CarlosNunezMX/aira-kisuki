import { Hono } from "hono";
import { logger } from "hono/logger";
const app = new Hono();

import { maintenanceMode } from "../maintenanceMode"
import { AiraRouter } from "./router";

app.use('*', maintenanceMode);
app.use("*", logger((str) => {
    console.log(`[Aira] ${str}`)
}))

app.route("/", AiraRouter)



console.log("[Aira] - Server started!")

export default app;