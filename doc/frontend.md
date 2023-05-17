# Frontend documentation

## Starting sequence

- When starting the frontend, `App.js` in `/client` runs. 
- `App.js` then loads `Homepage.js` in `/client/pages/Homepage`. 
- `Homepage.js` renders the map and the sidebar component. 

## Maps
### React simple maps
The library used for creating the maps is `React simple maps`. This library was choosen for the simplicity to color regions in a solid color. React simple maps renders a json-file format called topoJSON containing the borders of a region and the absolute global position for that region. There exists several online tools to convert from other fileformats to topoJSON. For example [this](https://mapshaper.org/). Region and country borders currently used are from [here](https://github.com/deldersveld/topojson). Additional maps can also be downloaded from [here](http://www.diva-gis.org/gdata). The topoJSON maps are located in `/client/public/maps`. The code related to the map is in the `Map` component. 

### API calls
There are two types of API calls.

Firstly, the app gets the region color data from an API call to the server. The data is then fetched from the cloud and some calculations are done in the backend, such as finding the maximum volume of a given area, which is used in the gradient.

Secondly, volume data for the graph. This includes the total volume data of beer consumption in all regions currently visible on this view-depth. The data is aggregated by hours, days or months depending on the timespan selected.

## Caching
Since the API calls to BigQuery takes some time, we have opted to use caching for the API calls. When a region is selected, all data for the different timespans is fetched. To make sure the data is up to date, the cache refreshes once every minute.

## Icons
All icons are from [material-ui](https://mui.com/material-ui/material-icons/). This is an example on how it can be used:
```import HelpIcon from '@mui/icons-material/Help';```
and then in the code use:
```<HelpIcon/>```

### More information about React can be found [here](../client/README.md)
### Information about the backend can be found [here](./backend.md)
