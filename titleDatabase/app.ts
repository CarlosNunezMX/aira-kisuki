import { Hono } from "hono";
import { logger } from "hono/logger";
import { maintenanceMode } from "../maintenanceMode"
import { KisukiRouter } from "./routers";


const app = new Hono();

app.route("/", KisukiRouter)
app.use('*', maintenanceMode);
app.use("*", logger((str) => {
    console.log(`[Kisuki] ${str}`)
}))


console.log("[Kisuki] - Server started!")
export default app;