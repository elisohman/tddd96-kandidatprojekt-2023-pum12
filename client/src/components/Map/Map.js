import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Map.css';
import TimespanButtons from "../../components/TimespanButtons/TimespanButtons";
import Tooltip from '@mui/material/Tooltip';
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Sphere,
    Graticule
} from "react-simple-maps";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

const MapChart = (props) => {
    const [data, setData] = useState([]);
    const [map, setMap] = useState("./maps/world.json");
    const [pos, setPos] = useState([0,0]);
    const [zoom, setZoom] = useState(1);
    const [country, setCountry] = useState(["", ""]);
    const [hover, setHover] = useState("");
    const [date, setDate] = useState("1d");
    const [maxColor, setMaxColor] = useState(1);
    const [mapLocation, setMapLocation] = useState(props.location);
    const navigate = useNavigate();
    
    useEffect(() => {
      updateInformation();
      const interval = setInterval(() => {
        // Code to be executed every 60 seconds
        updateInformation();
      }, 60 * 1000);
  
      return () => clearInterval(interval);
    }, [mapLocation]);
    
    // The colorscale to display on countries/regions
    const colorScale = scaleLinear()
      .domain([0, maxColor])
      .range(["#CCFF8C", "#2C5000"]);

    // List of countries that use NAME_1. Add ISO3 if the country has been added and uses NAME_1
    const name1 = ["AZE", "ARG", "DZA", "CHN", "COL", "CZE", "DNK", "IND", "IRL", "ITA", "JPN", "LBR", "NZL", "NOR", "PHL", "POL", "PRT", "ROU", "ZAF", "SWE", "ARE", "VEN"];

    // List of all available countries. Add ISO3 if there exists a json file for it
    const available = ["DEU", "ESP", "AZE", "ARG", "DZA", "BEL", "CHN", "COL", "CZE", "DNK", "FIN", "FRA", "IND", "IRL", "ITA", "JPN", "LBR", "NZL", "NOR", "PAK", "PHL", "POL", "PRT", "ROU", "ZAF", "SWE", "ARE", "GBR", "VEN"];

    function updateInformation() {
      const buttons = ["1d", "1w", "1m", "1y", "all"];
      buttons.forEach((button) => {
        if (mapLocation === "World") {
          getVolumeTotal(button);
        }
        else {
          getVolumeTotal(button, mapLocation);
        }
      })
    }

    // Activated when map is clicked
    // Changes the map, colordata, zoom and location
    function change_map(geo){  
      const map_id = geo.id;
      
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
      
      var location = window.location.pathname.toString().split("/");
      location = decodeURIComponent(location[location.length-1]);
      props.parentFunction(location);
      setMapLocation(location);
      updateInformation();
    }

    function ButtonFunction(index){
      const buttons = ["1d", "1w", "1m", "1y", "all"];
      setDate(buttons[index]);
    }

    useEffect(() => {
      if (mapLocation === "World") {
        getVolumeTotal(date).then( data => {
          setData(data.volumes);
          setMaxColor(data.max_volume);
        })
      }
      else {
        getVolumeTotal(date, mapLocation).then( data => {
          setData(data.volumes);
          setMaxColor(data.max_volume);
        })
      }
    }, [date, mapLocation]);

    function average_postion(geo){
      var coords = geo["geometry"]["coordinates"];
      
      // If the country has islands --> zoom to the biggest part
      if(typeof(coords[0][0][0][0]) == "number") {       
        var max = [0, 0];
        coords.forEach(element => {
            if (element[0].length > max[0]){
              max = [element[0].length, element[0]];
            }
        });
        coords = max[1];
      } else coords = coords[0];

      // Find longitude and latitude
      const longitude = coords.map(subarr => subarr[0]);
      const latitude = coords.map(subarr => subarr[1]);

      // Find middle
      const avgLong = longitude.reduce((sum, value) => sum + value, 0) / coords.length;
      const avgLat = latitude.reduce((sum, value) => sum + value, 0) / coords.length;
      
      // Find max differential in height
      const maxDiffHeight = Math.max(...latitude) - Math.min(...latitude);

      // Zoom to fit
      setZoom(147/maxDiffHeight);
      setPos([avgLong, avgLat]);
    }

    function getMaxVolume(v) {
      var p = Math.floor(Math.log(v) / Math.LN10), l = Math.floor(p / 3);
      var result = (Math.pow(10, p - l * 3) * +(v / Math.pow(10, p)).toFixed(1)) + ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'][l];
      if (Number.isNaN(result)) result = "<1";
      return result;
    }

    return (
      <div className="MapContainer">
        <div className="ColorMap">
          <Tooltip title={<p style={{ fontSize: 16, margin: 0 }}>{hover}</p>} followCursor={true}>
            <ComposableMap
              projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
              }}
              className="MapBoarder"
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
                {
                  <Geographies 
                  geography={map}
                  >
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        var NAME = "NAME_2";
                        if(name1.includes(country[0])) NAME = "NAME_1";
                        var d = data.find((s) => s.location === geo.properties[NAME]);
                        if(map === "./maps/world.json") d = data.find((s) => s.location === geo.properties.name);
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={d ? colorScale(d["total_volume"]) : "#CBCBCB"}
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
                }
                </ZoomableGroup>
              </ComposableMap>
            </Tooltip>
            <div className="Gradient">
              <div className="MaxValue">{getMaxVolume(maxColor)}&#8467;</div>
              <div className="MinValue">0&#8467;</div>
            </div>
        </div>
          <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
        </div>
      );
      
};

export default MapChart;
