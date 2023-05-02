import React, { useEffect, useState } from "react";
import "./OverviewBoxLiters.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

export default function SidebarHeader(props) {
    const [data, setData] = useState([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
    const [date, setDate] = useState("all");
    const [location, setLocation] = useState(props.location);

    useEffect(() => {
        if (location === "World") {
            getVolumeTotal(date).then( data => {
                if (data.volumes.length === 0) setData([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
                else setData(data);
            })
        }
        else {
            getVolumeTotal(date, location).then( data => {
                if (data.volumes.length === 0) setData([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
                else setData(data);
            })
        }
    }, [location, date]);

    console.log(data.total_volume);

  return ( 
    <div className="OverviewBoxContainer">
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped day (&#8467;)</div>
            <div className='InfoBoxValue'>{(data.total_volume).toLocaleString(undefined, {maximumFractionDigits:0})} &#8467;</div>
        </div>
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped week (&#8467;)</div>
            <div className='InfoBoxValue'>{(data.total_volume).toLocaleString(undefined, {maximumFractionDigits:0})} &#8467;</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped month (&#8467;)</div>
            <div className='InfoBoxValue'>{(data.total_volume).toLocaleString(undefined, {maximumFractionDigits:0})} &#8467;</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped year (&#8467;)</div>
            <div className='InfoBoxValue'>{(data.total_volume).toLocaleString(undefined, {maximumFractionDigits:0})} &#8467;</div>
        </div>        
    </div>
  )
}

