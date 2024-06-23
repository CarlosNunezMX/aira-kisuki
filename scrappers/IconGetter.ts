import { createDecipheriv } from "node:crypto"
import { Convert } from "pvtsutils"
import { Tga2Png } from "./Tga2Png";

const { K0, K1, K2, K3, IV } = process.env;

if (!K0 || !K1 || !K2 || !K3) throw new Error('Missing env vars');

if (!IV)
    throw new Error('Missing IV on env variables');

type Title = {
    shortName: string,
    longName: string,
    publisher: string
}
export type IconMeta = {
    titleID: string;
    titleVersion: string;
    titles: Title[];
}
export class IconGetter {
    readonly Keys: string[] = [K0!, K1!, K2!, K3!];
    readonly IV: string = IV!;
    readonly url = "https://idbe-wup.cdn.nintendo.net/icondata/10/$1.idbe";
    async getIcon(titleID: string) {
        const url = this.url.replace("$1", titleID.toUpperCase());
        const req = await fetch(url, {
            tls: { rejectUnauthorized: false }
        });

        if(!req.ok)
            return {
                meta: { titleID, titleVersion: "", titles: [] },
                tga: { data: Buffer.alloc(0), writer: () => {}, pngWriter: () => {} },
                writer: () => {}
            }

        const buffer = await req.arrayBuffer();
        return this.decrypt(new Uint8Array(buffer));
    }

    decrypt(buffer: Uint8Array) {

        const keyN = buffer.at(1)!;
        const key = Buffer.from(this.Keys[keyN], "hex");
        const iv = Buffer.from(this.IV, "hex");

        const encryptedData = buffer.slice().slice(0x2)
        const decipher = createDecipheriv('aes-128-cbc', key, iv);

        const data = decipher.update(encryptedData)
        
        const meta = this.getMetadata(data);
        
        const writer = () => this.writer(buffer, data, meta.titleID);
        return {
            meta,
            tga: this.GetTga(data, meta.titleID),
            writer
        }
    }
    
    private getMetadata(meta: Buffer): IconMeta {
        const titleID = meta.slice(0x20, 0x20 + 0x8).toString("hex");
        const titleVersion = meta.slice(0x28, 0x2C).toString("hex");

        const titleStrings = meta.slice(0x50, 0x50 + (0x200 * 11));
        const titles = this.getTitleNames(titleStrings);

        return { titleID, titleVersion, titles }
    }

    private getTitleNames(titles: Buffer): Title[] {
        const Titles: Title[] = [];
        for (let t = 0; t < titles.length; t += 0x200) {
            Titles.push(this.GetTitleMetadata(titles, t));
        }

        return Titles;
    }

    private Normalize(str: string) {
        return str.replaceAll("\u0000", "").trim();
    }

    private GetTitleMetadata(titles: Buffer, index: number): Title {
        const title = titles.slice(index, index + 0x200);
        const shortName = this.Normalize(
            Convert.ToUtf16String(title.slice(0x0, 128))
        );
        const longName = this.Normalize(
            Convert.ToUtf16String(title.slice(0x80, 256))
        );
        const publisher = this.Normalize(
            Convert.ToUtf16String(title.slice(0x180, 0x180 + 128))
        );

        return { shortName, longName, publisher }
    }

    private GetTga(buffer: Buffer, titleID: string) {
        const tga = buffer.slice(0x2050, 0x2050 + 0x1002C);
        
        return {
            data: tga,
            writer: () => this.writeTga(tga, titleID),
            pngWriter: () => this.pngWriter(tga, titleID)
        };
    }

    writeTga(tga: Buffer, titleID: string) {
        Bun.write("icons/" + titleID + ".tga", tga, {createPath: true});
    }

    private writer(file: Uint8Array, data: Buffer, titleID: string){
        Bun.write("icons/" + titleID + ".idbe", file, {createPath: true});
        Bun.write("icons/" + titleID + ".idbe.decrypted", data, {createPath: true});
    }

    private async pngWriter(tga: Buffer, titleID: string) {
        const file = await Tga2Png(tga);
        Bun.write("icons/" + titleID + ".png", file, {createPath: true});
    }
}