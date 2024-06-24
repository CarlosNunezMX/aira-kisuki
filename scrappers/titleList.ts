import BeautifulDom from "beautiful-dom";

export type Region = "USA" | "EUR" | "JPN" | "ALL" | "EUR/JAP/USA" | "EUR/USA";
export interface Title{
    title_id: string;
    region: Region;
    name: string;
    cdn: boolean
    title_type: TitleTypeMap;
}

enum TitleTypeMap {
    "00050010" = "system",
    "0005001B" = "system-archives",
    "00050030" = "applet",
    "00050000" = "eshop",
    "0005000C" = "dlc",
    "0005000E" = "update",
    "00050002" = "kiosk",
    "00000007" = "vwii",
    default = "unknown"
};
class TitleListScrapper{
    readonly url = "https://wiiubrew.org/wiki/Title_database";
    constructor(){

    }
    async scrap(){
        console.log("Sending reuqest to WiiUBrew")
        const request = await fetch(this.url);
        const request_text = await request.text();
        console.log("Request received, parsing data")
        const domloaded = new BeautifulDom(request_text);
        console.log("Data parsed, extracting titles")
        const tableHeaders = domloaded.querySelectorAll("h2 span");
        const tables = domloaded.querySelectorAll("table");
        console.log("Titles extracted, creating object")
        const titles: Record<string, Title> = {};
        tableHeaders.forEach((header, index) => {
            const id = header.getAttribute("id")?.split(":_")[1]
            if(!id)
                return;
            const table = tables[index];
            if(!table)
                return;
            const col = table.querySelectorAll('tr');
            col.forEach((row, index) => {
                if(index == 0)
                    return;
                const tds = row.querySelectorAll('td');
                if(tds.length === 5){
                    const _titleType = tds[0].innerText.trim().split("-")[0],
                            // @ts-ignore
                           titleType = TitleTypeMap[_titleType] || TitleTypeMap.default;
                    const title_id = tds[0].innerText.trim().replace("-", "");
                    const name = tds[1].innerText.trim();
                    const region = tds[4].innerText.trim().toUpperCase() as Region;

                    titles[title_id] = {title_id: title_id, name: name!, region: region, cdn: true, title_type: titleType};
                    return;
                }
                const title_id = tds[0].innerText.trim().replace("-", "");
                const _titleType = tds[0].innerText.trim().split("-")[0],
                            // @ts-ignore
                           titleType = TitleTypeMap[_titleType] || TitleTypeMap.default;
                const name = tds[1].innerText.trim();
                const region = tds[6].innerText.trim().toUpperCase() as Region
                const cdn = tds[7].innerText.trim() == "Yes";
                titles[title_id] = {title_id: title_id!, name: name!, region: region, cdn: cdn, title_type: titleType}
            })

        })
        return titles
    }
}

const titles = await new TitleListScrapper().scrap();
const file = Bun.file("./titles.json");
await Bun.write(file, JSON.stringify(titles));