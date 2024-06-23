# Kisuki / Aira

## Español

### Instanciar Servidor
> **Antes de iniciar.** Para ejecutar este proyecto es necesario tener instalado Bun.

Para instanciar el servidor Aira / Kisuki requieres hacer una copia del archivo `.env.example` a `.env` y configurar el puerto de las dos apps `{KISUKI|AIRA}-PORT`, agregar las claves para el modo mantenimiento.

- Prepara el proyecto
    - Instala las dependecias
    ```bash
    bun install
    ```
    - Crea la cache del title_database
    ```bash
    bun scrappers/titleList.ts
    ```
    - Descarga y desencripta los iconos desde la CDN
    ```bash
    bun scrappers/download_icon.ts --download
    ```
    - _[Opcional]_ Elimina los archivos invalidos/vacios
    ```bash
    bun scrappers/download_icon.ts --clean
    ```
- Incia el Proyecto
    ```bash                             
    bun start 
    ```
> Por defecto se escucharan los puertos `3000 [Aira]` y `3001 [Kisuki]`


## English

### Instanciar Servidor
> **Before start.** By using this project you will need to had installed Bun in your system

For make an instance of  Aira / Kisuki server you need to rename the file `.env.example` to `.env` and set the port of the two apps port `{KISUKI|AIRA}-PORT`, and add the maintenance keys

- Preparations for first run
    - Install project deps.
    ```bash
    bun install
    ```
    - Create cache of title_database
    ```bash
    bun scrappers/titleList.ts
    ```
    - Download and decrypt icons from CDN
    ```bash
    bun scrappers/download_icon.ts --download
    ```
    - _[Opcional]_ Delete invalids/empty files
    ```bash
    bun scrappers/download_icon.ts --clean
    ```
- Start the server
    ```bash
    bun start 
    ```

> By default it will listen on port `3000 [Aira]` and `3001 [Kisuki]`

Thanks to @kinnay for [Idbe Server docs](https://github.com/kinnay/NintendoClients/wiki/IDBE-Server)

**_With ❤️ from 🇲🇽 by CarlosNunezMX_**