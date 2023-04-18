import React, { useEffect, useState } from "react";
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

//const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json";
const geoUrl = "./world.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#94C58C", "#094F29"]);

const MapChart = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        csv(`./map_data`).then((data) => {
        setData(data);
        console.log(data)
        });
    }, []);

    return (
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147
          }}
        >
            <ZoomableGroup center={[0, 0]} zoom={1}>
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.ISO3 === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      onClick={() => {console.log(geo)}}
                      style={{
                          default: {
                          
                          outline: "none"
                          },
                          hover: {
                          fill: "#F53",
                          outline: "none"
                          },
                          pressed: {
                          fill: "#E42",
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
      );
};

export default MapChart;
