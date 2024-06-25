import { BentouItem, type BentouItemProps } from "./BentouIcon";
import { Section } from "./Section";

const Items: BentouItemProps[] = [
    {
        icon: "/public/icons/program.svg",
        title: "Get data easily",
        description: "Filter data by region, title_id or type"
    },
    {
        icon: "/public/icons/fast.svg",
        title: "Fast API",
        description: "Its run as fast possible by optimizing the request and title filtering"
    },
    {
        icon: "/public/icons/secure.svg",
        title: "It's secure!",
        description: "Data is Scrapped of WiiUBrew site"
    }
]

export function KisukiSection(){
    return (
        <Section 
            description="Kisuki is an Wii U Title Database."
            serverType="(TitleDB)"
            title="Kisuki "
        >
            {Items.map((item) => (
                <BentouItem {...item}/>
            ))}
        </Section>
    )
}