import type { Region, Title } from "../scrappers/titleList";

export class RegionFiltered {
    Titles: Record<Region, Record<string, Title>>;
    constructor() {
        this.Titles = this.init();
    }
    private init(): Record<Region, Record<string, Title>>{
        return {
            ALL: {},
            EUR: {},
            JPN: {},
            USA: {},
            "EUR/JAP/USA": {},
            "EUR/USA": {}
        }
    }
    filter(titles: Record<string, Title>){
        for(const Title in titles){
            const title = titles[Title];
            this.Titles[title.region][Title] = title;
        }
        console.log('[TitleDB] - Titltes filtered successfully')
        return this;
    }
}
export default new RegionFiltered()