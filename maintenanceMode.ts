import type { Context, Next } from "hono";

export function maintenanceMode(c: Context, n: Next){
    if(
        c.req.header("X-MAINTENANCE-MODE") !== process.env["MAINTENANCE_KEY"]
        && process.env["MAINTENANCE_MODE"] === "true"
    )
        return c.text("Under maintenance");

    return n();
}