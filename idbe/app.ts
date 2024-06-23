import { Hono } from "hono";
import { logger } from "hono/logger";
const app = new Hono();

app.use("*", logger((str) => {
    console.log(`[Aira] ${str}`)
}))

app.get("/", (c) => {
    return c.json({message: "Hello World!"})
})
app.get("/icon/:titleID", async  c => {
    const titleID = c.req.param("titleID");
    if(!titleID)
        return c.json({error: "TitleID not provided!"}, 401);
    const file = Bun.file(`icons/${titleID.toLowerCase()}.png`);
    if(!(await file.exists()))
        return c.json({error: "File does not exists!"}, 404);
    return new Response(file);
})

console.log("[Aira] - Server started!")

export default app;