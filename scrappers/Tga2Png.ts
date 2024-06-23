// @ts-ignore
import tga2png from "tga2png"

// @ts-ignore
export async function Tga2Png(tga: Uint8Array): Promise<Buffer>{
    return await tga2png(tga) as Buffer;
}