import { TitleTypeMap, type Title } from "../types/TitleDB";
import { IconGetter, type IconMeta } from "./IconGetter";
import { rmSync } from "node:fs"
const file = Bun.file("./titles.json");
const data = await file.json();
const bad_titles = ["system", "system-archives", "applet", "vwii", "unknown"]
async function downloader() {
    const getter = new IconGetter()
    for (const i in data) {
        const item: Title = data[i];
        if(bad_titles.includes(item.title_type))
            continue;
        console.log(`Downloading ${item.title_id}`)
        const icon = await getter.getIcon(item.title_id);
        if (!icon.meta.titleVersion) continue;
        icon.writer();
        await icon.tga.pngWriter();
        icon.tga.writer();
        await Bun.write(`icons/${item.title_id}.json`, JSON.stringify(icon.meta));
        console.log(`${item.title_id} has been downloaded!`)
    }
}
async function cleanner() {
    console.log("Cleaning up...")
    for (const key in data) {
        for (const i in data[key]) {
            const title: Title = data[key][i];
            const file = Bun.file("icons/" + title.title_id + ".json");
            console.log("Checking " + title.title_id + ".json");
            if (!(await file.exists())) continue;

            const content: IconMeta = await file.json();

            console.log("Title Version: " + content.titleVersion);

            if (!content.titleVersion) {
                rmSync("icons/" + title.title_id + ".json");
                console.log("Removed " + title.title_id + ".json")
            }

        }
    }
}

if (Bun.isMainThread) {

    if (process.argv[2] === "--clean") {
        await cleanner();
        process.exit(0)
    }

    if (process.argv[2] === "--download") {
        await downloader();
        process.exit(0)
    }
}
