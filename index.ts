import idbe from "./idbe/app"
import titleList from "./titleDatabase/app"


const {AIRA_PORT, KISUKI_PORT} = process.env;
if(!AIRA_PORT || !KISUKI_PORT) {
    throw new Error("Please provide AIRA_PORT and KISUKI_PORT in the environment variables")
}   


Bun.serve({
    fetch: idbe.fetch,
    port: AIRA_PORT
});

Bun.serve({
    fetch: titleList.fetch,
    port: KISUKI_PORT
});