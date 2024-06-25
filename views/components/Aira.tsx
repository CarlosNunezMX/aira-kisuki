import { BentouItem, type BentouItemProps } from "./BentouIcon";
import { Section } from "./Section";

const Items: BentouItemProps[] = [
    {
        icon: "/public/icons/image.svg",
        title: "Get any icon from TitleID",
        description: "Just send the Title ID and you will get the PNG of that Title."
    },
    {
        icon: "/public/icons/meta.svg",
        title: "Get TitleID Metadata",
        description: "Just send the Title ID and you will get the name, version and localizated names."
    },
    {
        icon: "/public/icons/decrypted.svg",
        title: "De/Encrypted Data",
        description: "Get decrypted or encrypted data with just a header."
    },
    {
        icon: "/public/icons/format.svg",
        title: "Get the format what you want",
        description: "Get a TGA file with just one header."
    }
]

export function AiraSection(){
    return (
        <Section 
            description="Aira is an replacement for Idbe NN server"
            serverType="(Idbe)"
            title="Aira "
        >
            {Items.map((item) => (
                <BentouItem {...item}/>
            ))}
        </Section>
    )
}