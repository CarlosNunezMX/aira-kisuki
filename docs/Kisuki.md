# Kisuki
> Endpoint: `kisuki.carlosnunezmx.work.gd`

API de Catalogo de Titulos obtenida de: / Title database api getted from: https://wiiubrew.org
___

## Español
### Endpoints

#### Obten los titulos de una región
**🚗 Ruta:** `/titles/:region`

**❓ Parametros:** 
 - _:region_  - [`Region`](#region)

**🚥 Respuesta:**
 - Valida: [`Title[]`](#title)
 - Error: [`Error`](#error)


#### Buscar un titulo
**🚗 Ruta:** `/titles/search`

**❓ Query:**
 - _?region_  - [`Region`](#region)
 - _?name_ - `string`

**🚥 Respuesta:**
 - Valida: [`Title[]`](#title)
 - Error: [`Error`](#error)

#### Obtener datos de un Titulo
**🚗 Ruta:** `/titles/:title_id`

**❓ Parametros:** 
 - _:title_id_  - `string`

**🚥 Respuesta:**
 - Valida: [`Title`](#title)
 - Error: [`Error`](#error)

## English
### Endpoints

#### Get all titles of a region
**🚗 Path:** `/titles/:region`

**❓ Params:** 
 - _:region_  - [`Region`](#region)s

**🚥 Response:**
 - Ok: [`Title[]`](#title)
 - Error: [`Error`](#error)

#### Search for a title
**🚗 Path:** `/titles/search`

**❓ Query:**
 - _?region_  - [`Region`](#region)
 - _?name_ - `string`

**🚥 Response:**
 - Ok: [`Title[]`](#title)
 - Error: [`Error`](#error)

#### Get data from TitleID
**🚗 Path:** `/titles/:title_id`

**❓ Params:** 
 - _:title_id_  - `string`
 
**🚥 Response:**
 - Ok: [`Title`](#title)
 - Error: [`Error`](#error)


## Tipos / Types
### Error
```ts
{
  message: string;
}
```
### Region
```ts
type Region = "USA" | "EUR" | "JPN" | "ALL" | "EUR/JAP/USA" | "EUR/USA";
```

### Title
```ts
{
  title_id: string;
  name: string;
  Region: "USA" | "EUR" | "JPN" | "ALL" | "EUR/JAP/USA" | "EUR/USA";
  cdn: boolean;
}
```