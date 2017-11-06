# ad-API
Alter Dark API

## Usage
`GET https://alterdark.azurewebsites.net/api/` with paramaters listed in maps below.

## Maps
 - [Alter Dark](#alter-dark-map)

### Alter Dark map
| param       | example value | notes                   |
| ----------- | ------------- | ----------------------- |
| "rom"       | "AlterDark"   |
| "bgpala0"<BR>...<BR>"bgpalh3"   | 0x3C | see palette param naming convention below.<BR>![pal](pal.png)<BR>all x0 colors (a0, b0, h0, etc.) must be the same value. |
| "anim"      | 0x01          | 0x00 = none, 0x01 = aliens, 0x02 = hearts |
| "animspeed" | 0x01          | 0x01 = slow, 0x02 = med, 0x04 = fast |
| "randomseed1"<BR>"randomseed2" | 0xFA        | used for generating random colors and positions in nes rom. generate in javascript: `randomseed1 = Math.floor(Math.random() * 256);` |
| "text1_1"<BR>...<BR>"text2_28" | "H" | supports ascii values 0x20 through 0x7E. see [ascii-table.com](http://ascii-table.com/). |
 
 
