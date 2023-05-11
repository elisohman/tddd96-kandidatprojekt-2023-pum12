# Frontend dokumentation

## Table of Contents
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Documentation](#documentation)

## Frontend Structure 📁

### Starting sequence

- When starting the frontend, `App.js` in `/client`  is run. 
- `App.js` then loads `Homepage.js` in `/client/pages/Homepage`. 
- `Homepage.js` renders the map and the right sidebar component. 

### Components
All components are located in `/client/components`.

### Public
In `/client/public` are static filed located. The JSON map data is located here.

## React simple maps
The library used for creating the maps is `React simple maps`. This library was choosen for the simplicity to color regions in a a solid color. React simple maps renders a json-file format called topoJSON containing the borders of a region and the absolute global location for that region. It exist several online tools to covert from other fileformats (for example geoJSON) to topoJSON. More region borders can be downloaded from this webside: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX. The topoJSON maps are located in `/client/public/maps`. The code related to the map is in the `Map` component. 



# Icons
Example:
import HelpIcon from '@mui/icons-material/Help';
Link to website:
https://mui.com/material-ui/material-icons/ for icons
