# Aira
> Endpoint: `aira.carlosnunezmx.work.gd`

API para obtener los iconos de los titulos de Nintendo Wii U. / API for getting icons for Nintendo Wii U Titles 

**Reemplazo para / Replacement for [https://idbe-wup.cdn.nintendo.net](https://idbe-wup.cdn.nintendo.net)**
___

## Español

### Endpoints
#### Obten un icono desde los Servidores de Nintendo [PNG]
**🚗 Ruta: `/icon/:titleID`**

🤔 _Ejemplo:_ `https://aira.carlosnunezmx.work.gd/icon/00050000101DBE00` _Ícono de Minecraft_

<center><img style="border-radius: 5px;" src="https://aira.carlosnunezmx.work.gd/icon/00050000101DBE00" alt="Icono de Minecraft"/></center>

#### Obten un icono desde los Servidores de Nintendo [IDBE]
**🚗 Ruta:** `/icondata/:id/:titleID` 
- **🍁Notas**
     - El ícono esta encriptado para mas información acudir a la documentacion de Nintendo Servers
    - El parametro `:id` no se toma en cuenta, se toma por defecto el 10. _Es el que se tiene en cache_
    - **Formato usado solo en Wii U**
    - Con el header `X-Decrypted` este regresara el icono desencriptado. [No Implementado]

_Ejemplo:_ `https://aira.carlosnunezmx.work.gd/icondata/10/00050000101DBE00` - _Regresa el Ícono de Minecraft encriptado_


## English
### Endpoints
#### Get Icon from Nintendo Server [PNG]
**🚗 Path: `/icon/:titleID`**

_Example:_ `https://aira.carlosnunezmx.work.gd/icon/00050000101DBE00` _Minecraft Icon_
<center><img style="border-radius: 5px;" src="https://aira.carlosnunezmx.work.gd/icon/00050000101DBE00" alt="Minecraft Logo"/></center>

#### Get Icon from Nintendo Servers [IDBE] 
**🚗 Path: `/icondata/:id/:titleID`**
- **🍁Notes**
  - The icon is encrypted by default. Visit the Nintendo Servers Documentation for more
  - The `:id` parameter will not make any sense. _It was catched before_
  - **Format used only on Wii U**
  - With the header `X-Decrypted` this will returns the decrypted icon. [Not implemented ]
  
🤔 _Example:_ `https://aira.carlosnunezmx.work.gd/icondata/10/00050000101DBE00` - _Returns encrypted Minecraft Icon_

#### Get the meta of the icon
**🚗 Path:** `/meta/:title_id`

**❓ Params:** 
 - _:title_id_  - `string`

**🚥 Response:**
 - Ok: [`IconMeta `](#iconmeta)
 - Error: [`Error`](#error)

# Types / Tipos
## IconMeta
```ts
type IconMeta = {
    titleID: string;
    titleVersion: string;
    titles: Title[];
}
```


## Title
```ts
type Title = {
    shortName: string,
    longName: string,
    publisher: string
}
```