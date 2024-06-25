import { Hono } from "hono";
import { logger } from "hono/logger";
import { maintenanceMode } from "../maintenanceMode"
import { KisukiRouter } from "./routers";
import { serveStatic } from "hono/bun";
import { PublicSettings } from "../utils/public";
import { IndexView } from "../views";


const app = new Hono();
app.use('*', maintenanceMode);
app.use("*", logger((str) => {
    console.log(`[Kisuki] ${str}`)
}))

app.use("/public/*", serveStatic(PublicSettings))

app.get("/", c => {
    return c.html(IndexView())
})


app.route("/", KisukiRouter)

console.log("[Kisuki] - Server started!")
export default app;