import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Map.css';
import Tooltip from '@mui/material/Tooltip';
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Sphere,
    Graticule
} from "react-simple-maps";

// The colorscale to display on contries/regions
const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#CCFF8C", "#2C5000"]);

const MapChart = () => {
    const [data, setData] = useState([]);
    const [map, setMap] = useState("./maps/world.json");
    const [pos, setPos] = useState([0,0]);
    const [zoom, setZoom] = useState(1);
    const [country, setCountry] = useState(["", ""]);
    const [hover, setHover] = useState("");
    const [date, setDate] = useState("1w");
    const navigate = useNavigate();

    // List of countries that use NAME_1. Add ISO3 if the country has been added and uses NAME_1
    const name1 = ["AZE", "ARG", "DZA", "CHN", "COL", "CZE", "DNK", "IND", "IRL", "ITA", "JPN", "LBR", "NZL", "NOR", "PHL", "POL", "PRT", "ROU", "ZAF", "SWE", "ARE", "VEN"];

    // List of all available countries. Add ISO3 if there exists a json file for it
    const available = ["DEU", "ESP", "AZE", "ARG", "DZA", "BEL", "CHN", "COL", "CZE", "DNK", "FIN", "FRA", "IND", "IRL", "ITA", "JPN", "LBR", "NZL", "NOR", "PAK", "PHL", "POL", "PRT", "ROU", "ZAF", "SWE", "ARE", "GBR", "VEN"];
    
    useEffect(() => {
        csv(`./map_data`).then((data) => {
        setData(data);
        });
    }, []);

    // Activated when map is clicked
    // Changes the map, colordata, zoom and location
    function change_map(geo){  
      const map_id = geo.id;
      
      console.log(window.location.pathname)
      if (map === "./maps/world.json") {
        navigate('/' + geo.properties.name);
        setCountry([geo.id, geo.properties.name]);
      }
      else {
        var NAME = "NAME_2";
        if(name1.includes(country[0])) NAME = "NAME_1";
        navigate(country[1] + '/' + geo.properties[NAME]);
      }
      
      average_postion(geo);
      if(!available.includes(map_id)) return;
      
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
        <Tooltip title={<p style={{ fontSize: 16, margin: 0 }}>{hover}</p>} followCursor={true}>
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147
            }}
            >
              <ZoomableGroup 
                center={pos} 
                zoom={zoom} 
                maxZoom={5000}
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
                      var NAME = "NAME_2";
                      if(name1.includes(country[0])) NAME = "NAME_1";
                      var d = data.find((s) => s.name === geo.properties[NAME]);
                      if(map === "./maps/world.json") d = data.find((s) => s.ISO3 === geo.id);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={d ? colorScale(d[date]) : "#CBCBCB"}
                          onClick={() => {change_map(geo)}}
                          onMouseEnter={() => {
                            var NAME = "name";
                            if(map !== "./maps/world.json") {
                              if(name1.includes(country[0])) NAME = "NAME_1";
                              else NAME = "NAME_2"
                            }
                            setHover(geo.properties[NAME]);
                          }}
                          onMouseLeave={() => {
                            setHover("");
                          }}
                          style={{
                            default: {
                              stroke: "#000000",
                              strokeWidth: 0.01,
                            outline: "none"
                            },
                            hover: {
                            fill: "#BFCDFF",
                            stroke: "#000000",
                            strokeWidth: 0.025,
                            outline: "none"
                            }
                          }} 
                        />
                      );
                    })
                  }
                </Geographies>
              )}
              </ZoomableGroup>
            </ComposableMap>
          </Tooltip>
        </div>
      );
      
};

export default MapChart;
