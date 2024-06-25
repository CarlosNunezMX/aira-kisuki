import type { JSX } from "hono/jsx/jsx-runtime"

export type SectionProps = {
    children: JSX.Element[]
    title: string;
    description: string;
    serverType: string;
}
export function Section({ children, description, serverType, title }: SectionProps) {
    return (
        <section class="px-2">
            <h2 class="text-xl font-bold">
                {title}
                <span className="text-sm italic bg-slate-300 p-1 rounded">
                    {serverType}
                </span>
            </h2>
            <p>{description}</p>
            <section>
                <h3 class="text-lg font-bold mt-5">Feautres</h3>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-2">
                    {children}
                </div>
            </section>
        </section>
    )
}