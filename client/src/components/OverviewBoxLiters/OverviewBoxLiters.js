import React, { useEffect, useState } from "react";
import "./OverviewBoxLiters.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

export default function SidebarHeader(props) {
    const [data, setData] = useState({"1d":0, "1w":0, "1m":0, "1y":0, "all":0});
    const [location, setLocation] = useState(props.location);
    const timeSpan = ["1d", "1w", "1m", "1y", "all"];

    useEffect(() => {
        setLocation(props.location);
    }, [props.location]);

    useEffect(() => {
        let temp = {};
        if (location === "World") {
            timeSpan.forEach( (date) => {
                getVolumeTotal(date).then( data => {
                    if (data.volumes.length === 0) setData({"1d":0, "1w":0, "1m":0, "1y":0, "all":0});
                    else temp[date] = data.total_volume.toLocaleString(undefined, {maximumFractionDigits:0});
                })
            });
        }
        else {
            timeSpan.forEach( (date) => {
                getVolumeTotal(date, location).then( data => {
                    if (data.volumes.length === 0) setData({"1d":0, "1w":0, "1m":0, "1y":0, "all":0});
                    else temp[date] = data.total_volume.toLocaleString(undefined, {maximumFractionDigits:0});
                })
            });
        }
        setData(temp);
    }, [location]);

  return (
    <div className="OverviewBoxContainer">
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped day (&#8467;)</div>
            <div className='InfoBoxValue'>{
            data["1d"]
            } &#8467;</div>
        </div>
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped week (&#8467;)</div>
            <div className='InfoBoxValue'>{
            data["1w"]
            } &#8467;</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped month (&#8467;)</div>
            <div className='InfoBoxValue'>{
            data["1m"]
            } &#8467;</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped year (&#8467;)</div>
            <div className='InfoBoxValue'>{
            data["1y"]
            } &#8467;</div>
        </div>        
    </div>
  )
}

