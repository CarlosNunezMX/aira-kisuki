import { Hono } from "hono";
export const AiraRouter = new Hono();

AiraRouter.get("/icon/:titleID", async c => {
    const accept = c.req.header("Accept");
    // png or tga default png
    const fileExt = accept == "image/png" ? ".png" : accept == "image/tga" ? ".tga" : ".png";
    const titleID = c.req.param("titleID");
    if (!titleID)
        return c.json({ error: "TitleID not provided!" }, 401);
    const file = Bun.file(`icons/${titleID.toLowerCase()}${fileExt}`);
    if (!(await file.exists()))
        return c.json({ error: "File does not exists!" }, 404);
    return new Response(file, {
        headers: {
            "Content-Type": "image/png"
        }
    });
})

AiraRouter.get("/icondata/:id/:file", async c => {
    const { file } = c.req.param();
    const decrypted = c.req.header("X-Decrypted")
    if (!file)
        return c.json({ error: "File not provided!" }, 401);
    if (file.includes(".") && !file.endsWith("idbe"))
        return c.json({ error: "Invalid file type!" }, 401);

    const File = Bun.file(`icons/${file.endsWith("idbe") ? file.toLowerCase() :  decrypted ? file + '.idbe.decrypted'.toLowerCase()  : `${file}.idbe`.toLowerCase()}`);
    if (!(await File.exists()))
        return c.json({ error: "File does not exists!" }, 404);
    return new Response(File)
})

AiraRouter.get("/meta/:titleID", async c => {
    const { titleID } = c.req.param();
    if (!titleID)
        return c.json({ error: "TitleID not provided!" }, 401);

    const File = Bun.file(`icons/${titleID.toUpperCase()}.json`);
    if (!(await File.exists()))
        return c.json({ error: "Title has not metadata!" }, 404);
    return new Response(File)
})