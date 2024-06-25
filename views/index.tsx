import { AiraSection } from "./components/Aira";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { KisukiSection } from "./components/Kisuki";

export function IndexView() {
  return (
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aira + Kisuki</title>
        <link rel="stylesheet" href="/public/styles/styles.css" />
    </head>
    <body>
        <Header/>
        <main class="w-[80%] mt-5 mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AiraSection/>
            <KisukiSection/>
        </main>

        <Footer/>
    </body>
    </html>
  );
}

