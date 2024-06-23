import BeautifulDom from "beautiful-dom";
type Region = "USA" | "EUR" | "JPN" | "ALL";
export interface Title{
    title_id: string;
    region?: Region;
    name: string;
    cdn: boolean
}

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
        const titles: Record<string, Title[]> = {};
        tableHeaders.forEach((header, index) => {
            const id = header.getAttribute("id")?.split(":_")[1]
            if(!id)
                return;
            titles[id] = [];
            const table = tables[index];
            if(!table)
                return;
            const col = table.querySelectorAll('tr');
            col.forEach((row, index) => {
                if(index == 0)
                    return;
                const tds = row.querySelectorAll('td');
                if(tds.length === 5){
                    const title_id = tds[0].innerText.trim().replace("-", "");
                    const name = tds[1].innerText.trim();
                    const region = tds[4].innerText.trim() as Region;

                    titles[id].push({title_id: title_id, name: name!, region: region, cdn: true});
                    return;
                }
                const title_id = tds[0].innerText.trim().replace("-", "");
                const name = tds[1].innerText.trim();
                const region = tds[6].innerText.trim() as Region
                const cdn = tds[7].innerText.trim() == "Yes";
                titles[id].push({title_id: title_id!, name: name!, region: region, cdn: cdn});
            })

        })
        return titles
    }
}

const titles = await new TitleListScrapper().scrap();
const file = Bun.file("./titles.json");
await Bun.write(file, JSON.stringify(titles));