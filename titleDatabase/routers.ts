import { Hono } from "hono";
export const KisukiRouter = new Hono();
import cachedRegion from "./cachedRegions";

import type { Title } from "../scrappers/titleList";
import type { Region } from "../scrappers/titleList";

const titleListFile = Bun.file('./titles.json');
let titles: Record<string, Title> = {};

titleListFile.json()
    .then((data) => {cachedRegion.filter(data); titles = data});


KisukiRouter.get('/titles/search', c => {
    let {name, region} = c.req.query();
    region= region?.toUpperCase();

    if(!name && !region)
        return c.json({error: "No search parameters provided"}, 400);
    
    if(region && !cachedRegion.Titles[region as Region])
        return c.json({error: "Region not found"}, 404);

    const filtered = Object.values(cachedRegion.Titles[region as Region] || titles)
        .filter(t => {
            if(name && !t.name.toLowerCase().includes(name.toLowerCase()))
                return false;
            return true;
        });


    return c.json(filtered)
})





KisukiRouter.get('/title/:region/:title_id', c => {
    const {region , title_id} = c.req.param();
    if(!region || !title_id)
        return c.json({error: "Region or title_id not provided"}, 400);

    if(!cachedRegion.Titles[region as Region])
        return c.json({error: "Region not found"}, 404);

    const title = cachedRegion.Titles[region as Region][title_id];
    if(!title)
        return c.json({error: "Title not found"}, 404);

    return c.json(title);
    
})

KisukiRouter.get("/titles/:region", c => {
    const {region} = c.req.param();
    if(!region)
        return c.json({error: "Region not provided"}, 400);

    if(!cachedRegion.Titles[region as Region])
        return c.json({error: "Region not found"}, 404);

    return c.json(cachedRegion.Titles[region as Region]);
})