# Frontend dokumentation

## Starting sequence

- When starting the frontend, `App.js` in `/client`  is run. 
- `App.js` then loads `Homepage.js` in `/client/pages/Homepage`. 
- `Homepage.js` renders the map and the sidebar component. 

## Maps
### React simple maps
The library used for creating the maps is `React simple maps`. This library was choosen for the simplicity to color regions in a a solid color. React simple maps renders a json-file format called topoJSON containing the borders of a region and the absolute global position for that region. It exist several online tools to covert from other fileformats to topoJSON. For example [this](https://mapshaper.org/). Region and country borders can be downloaded from [here](https://github.com/deldersveld/topojson) and [here](http://www.diva-gis.org/gdata). The topoJSON maps are located in `/client/public/maps`. The code related to the map is in the `Map` component. 

### API calls
There are two types of API calls.

Firstly, the app get the region color data from an API call to server. These files are in .csv format. The key in the .csv must match with the name of the region in the .json map file. The value in the .csv is on a scale from 0 to 1.

Secondly, volume data. This includes all the data on volume of beer consumption in differnt regions.


## Cashing
Since the API call to Big query takes around two seconds, we have opted to use cashing on some API calls. When a region is selected, all data for the different timespans is loaded into the sidebar. To make sure the data is up to date, the cash refreshes once every minute.


## Icons
All icons are from [material-ui](https://mui.com/material-ui/material-icons/). This is example on how it can be used.
```import HelpIcon from '@mui/icons-material/Help';```
and then in code use:
```<HelpIcon/>```

### More information on React can be found [here](../client/README.md)
### Information on backend [here](./backend.md)
