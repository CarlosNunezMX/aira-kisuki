import { Hono } from "hono";
import { logger } from "hono/logger";
import type { Title } from "../scrappers/titleList";

const app = new Hono();

const titleListFile = Bun.file('./titles.json');
let titles: Record<string, Title[]>;

titleListFile.json()
    .then((data) => titles = data);

app.use("*", logger((str) => {
    console.log(`[Kisuki] ${str}`)
}))

app.get("/", (c) => {
    return c.json({message: "Hello World!"})
})

app.get('/categories', c => {
    return c.json(Object.keys(titles))
})

app.get('/titles/:category', c => {
    const category = c.req.param("category");
    const limit = c.req.query("limit");
    if(!category || !titles[category])
        return c.json({error: "Category not found"}, 404);
    return c.json(titles[category].slice(0, limit ? parseInt(limit) : titles[category].length));
})


app.get('/title/:category/:title_id', c => {
    const {category, title_id} = c.req.param();
    if(!category || !title_id || !titles[category])
        return c.json({error: "Category or title not found"}, 404);
    const title = titles[category].find(t => t.title_id === title_id);
    if(!title)
        return c.json({error: "Title not found"}, 404);
    return c.json(title);
})

app.get('/search', c => {
    let {name, region, title_id, category} = c.req.query();
    region = region?.toLowerCase();
    title_id = title_id?.toLowerCase();
    if(category){
        const searchLimit = titles[category];
        if(!searchLimit)
            return c.json({error: "Category not found"}, 404);
        return c.json(searchLimit.filter(t => {
            if(name && !t.name.toLowerCase().includes(name.toLowerCase()))
                return false;
            if(region && t.region?.toLowerCase() !== region)
                return false;
            if(title_id && t.title_id?.toLowerCase() !== title_id)
                return false;
            return true;
        }))
    }

    return c.json(Object.keys(titles).map(key => {
        return titles[key].filter(t => {
            if(name && !t.name.toLowerCase().includes(name.toLowerCase()))
                return false;
            if(region && t.region?.toLowerCase() !== region)
                return false;
            if(title_id && t.title_id?.toLowerCase() !== title_id)
                return false;
            return true;
        })
    }).flat())
})

console.log("[Kisuki] - Server started!")
export default app;