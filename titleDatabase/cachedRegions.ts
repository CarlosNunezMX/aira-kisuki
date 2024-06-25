import type { Region, TitleDBRaw } from "../types/TitleDB";

export class RegionFiltered {
    Titles: Record<Region, TitleDBRaw>;
    constructor() {
        this.Titles = this.init();
    }
    private init(): Record<Region, TitleDBRaw>{
        return {
            ALL: {},
            EUR: {},
            JPN: {},
            USA: {},
            "EUR/JAP/USA": {},
            "EUR/USA": {}
        }
    }
    filter(titles: TitleDBRaw){
        for(const Title in titles){
            const title = titles[Title];
            this.Titles[title.region][Title] = title;
        }
        console.log('[TitleDB] - Titltes filtered successfully')
        return this;
    }
}
export default new RegionFiltered()