import { Hono } from "hono";
export const AiraRouter = new Hono();

AiraRouter.get("/icon/:titleID", async c => {
    const titleID = c.req.param("titleID");
    if (!titleID)
        return c.json({ error: "TitleID not provided!" }, 401);
    const file = Bun.file(`icons/${titleID.toLowerCase()}.png`);
    if (!(await file.exists()))
        return c.json({ error: "File does not exists!" }, 404);
    return new Response(file);
})

AiraRouter.get("/icondata/:id/:file", async c => {
    const { file } = c.req.param();
    if (!file)
        return c.json({ error: "File not provided!" }, 401);

    const File = Bun.file(`icons/${file.endsWith("idbe") ? file.toLowerCase() : `${file}.idbe`.toLowerCase()}`);
    if (!File.exists())
        return c.json({ error: "File does not exists!" }, 404);
    return new Response(file)
})