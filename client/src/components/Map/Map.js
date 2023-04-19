import React, { useEffect, useState } from "react";
import './Map.css';
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Sphere,
    Graticule,
    Marker
} from "react-simple-maps";

// The colorscale to display on contries/regions
const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#94C58C", "#094F29"]);

const MapChart = () => {
    const [data, setData] = useState([]);
    const [map, setMap] = useState("./maps/world.json");
    const [pos, setPos] = useState([0,0]);
    const [zoom, setZoom] = useState(1);
    
    useEffect(() => {
        csv(`./map_data`).then((data) => {
        setData(data);
        });
    }, []);

    // Activated when map is clicked
    // Changes the map, colordata, zoom and location
    function change_map(geo){
      const map_id = geo["id"];
      const available = ["DEU", "ESP"];

      average_postion(geo);
      if(!available.includes(map_id)) return
      
      // Update the map
      setMap("./maps/" + map_id + ".json");

      // Update the colors on the map
      csv(`./map_data/` + map_id).then((data) => {
      setData(data);
      });    
    }

    function average_postion(geo){
      var cords = geo["geometry"]["coordinates"];
      
      // If the country has islands --> zoom to the biggest part
      if(typeof(cords[0][0][0][0]) == "number") {       
        var max = [0, 0];
        cords.forEach(element => {
            if (element[0].length > max[0]){
               max = [element[0].length, element[0]];
            }

        });
        cords = max[1];
      } else cords = cords[0];
      console.log(cords);

      // Find longitude and latitude
      const longitude = cords.map(subarr => subarr[0]);
      const latitude = cords.map(subarr => subarr[1]);

      // Find middle
      const avgLong = longitude.reduce((sum, value) => sum + value, 0) / cords.length;
      const avgLat = latitude.reduce((sum, value) => sum + value, 0) / cords.length;
      
      // Find max differential in height
      const maxDiffHeight = Math.max(...latitude) - Math.min(...latitude);

      // Zoom to fit
      setZoom(147/maxDiffHeight);
      setPos([avgLong, avgLat]);
    }

    return (
      <div className="MapContainer">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147
          }}
        >
          <ZoomableGroup 
            center={pos} 
            zoom={zoom} 
            maxZoom={70}
            translateExtent={[
                [0, 0],
                [800, 600]
              ]}
            >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies 
            geography={map}
            >
              {({ geographies }) =>
                geographies.map((geo) => {
                  var d = data.find((s) => s.name === geo.properties.NAME_2);
                  if(map === "./maps/world.json"){
                    d = data.find((s) => s.ISO3 === geo.id);
                  }
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d["1m"]) : "#CBCBCB"}
                      onClick={() => {change_map(geo)}}
                      style={{
                          default: {
                            stroke: "#000000",
                            strokeWidth: 0.05,
                          outline: "none"
                          },
                          hover: {
                          fill: "#BFCDFF",
                          stroke: "#000000",
                          strokeWidth: 0.05,
                          outline: "none"
                          },
                      }} 
                    />
                  );
                })
              }
            </Geographies>
          )}
          </ZoomableGroup>
        </ComposableMap>
        </div>
      );
      
};

export default MapChart;
