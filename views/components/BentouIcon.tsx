export type BentouItemProps = {
    icon: string;
    title: string;
    description: string;
}
export function BentouItem(props: BentouItemProps){
    return (
        <div class="rounded bg-slate-200 text-black pb-2 px-2 flex flex-col">
            <div class="bg-slate-800 p-5 rounded-full place-content-center self-center my-4 grid w-fit">
                <img src={props.icon} alt={props.title + "icon"}/>
            </div>
            <h4 class="font-bold text-center">{props.title}</h4>
            <p class="text-xs text-center text-gray-500">{props.description}</p>
        </div>
    )
    
}