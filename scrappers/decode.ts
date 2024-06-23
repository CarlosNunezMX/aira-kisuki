import {createHash} from "node:crypto"
const {K0, K1, K2, K3, IV} = process.env;
if(!K0 || !K1 || !K2 || !K3) throw new Error('Missing env vars');

if(!IV)
    throw new Error('Missing IV on env variables');

export function DecryptIdbe(idbe: string){
    const key = createHash("")
}