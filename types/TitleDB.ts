export type TitleDBRaw = Record<string, Title>;

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