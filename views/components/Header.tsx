export default function () {
    return (
        <header class="bg-slate-800 text-white py-5 grid grid-cols-2">
            <div class="w-[80%] mx-auto">
                <h1 class="text-xl font-bold">Aira & Kisuki</h1>
                <h2 class="text-sm text-slate-300">Idbe and Title Database Servers</h2>
            </div>

            <div className="w-[80%] mx-auto grid grid-rows-2 justify-items-end gap-3">
                <a class="px-2 py-1 bg-slate-900 rounded cursor-pointer hover:bg-black ease-in-out transition-all" href="https://playground.carlosnunezmx.work.gd/?playground_type=aira">Aira Playground</a>
                <a class="px-2 py-1 bg-slate-900 rounded cursor-pointer hover:bg-black ease-in-out transition-all" href="https://playground.carlosnunezmx.work.gd/?playground_type=kisuki">Kisuki Playground</a>
            </div>
        </header>
    )
}