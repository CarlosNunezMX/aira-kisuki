import { IconGetter, type IconMeta } from "./IconGetter";
import { rmSync } from "node:fs"
import type { Title } from "./titleList";
const file = Bun.file("./titles.json");
const data = await file.json();

async function downloader() {
    const getter = new IconGetter()
    for(const key in data){
        console.log(`Section ${key}`)
        for(let i = 0; i < data[key].length; i++){
            const item = data[key][i] as Title; 
            console.log(`Downloading ${item.title_id}`)
            const icon = await getter.getIcon(item.title_id);
            if(!icon.meta.titleVersion) continue;
            icon.writer();
            await icon.tga.pngWriter();
            icon.tga.writer();
            await Bun.write(`icons/${item.title_id}.json`, JSON.stringify(icon.meta));
            console.log(`${item.title_id} has been downloaded!`)
        }
    }
}
async function cleanner() {
    console.log("Cleaning up...")
    for (const key in data) {
        for(let i = 0; i < data[key].length; i++){
            const title = data[key][i];
            const file = Bun.file("icons/" + title.title_id + ".json");
            console.log("Checking " + title.title_id + ".json");
            if(!(await file.exists())) continue;
            
            const content: IconMeta = await file.json();
            
            console.log("Title Version: " + content.titleVersion);
            
            if(!content.titleVersion){
                rmSync("icons/" + title.title_id + ".json");
                console.log("Removed " + title.title_id + ".json")
            }
        
        }
    }
}

if(Bun.isMainThread){
    
    if(process.argv[2] === "--clean"){
        await cleanner();
        process.exit(0)
    }

    if(process.argv[2] === "--download"){
        await downloader();
        process.exit(0)
    }
}