import React from 'react'
import './Map.css'
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
//import {Tooltip as ReactTooltip} from "react-tooltip"

const geoUrl = "world.json";

export default function Map() {
    return ( 
        <div>
            <SidebarHeader/>
            <ComposableMap data-tip="" className="Map">
                <Geographies geography={geoUrl} className="Country">
                    {({geographies}) => 
                        geographies.map((geo) => (
                            
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    )
}

{/*
<ReactTooltip>{content}</ReactTooltip>
*/}
{/*
onMouseEnter={() => {
    const { NAME } =  geo.properties;
    setcontent(`${NAME}`);
}}
onMouserLeave={() => {
    setcontent("");
}}
style={{
    hover: {
        fill: "#F53",
        outline: "none",
    },
}}
*/}