import React, { useEffect, useState } from "react";
import "./OverviewBoxBeers.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

export default function SidebarHeader(props) {
    const [data, setData] = useState([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
    const [date, setDate] = useState("all");
    const [location, setLocation] = useState(props.location);

    useEffect(() => {
        setLocation(props.location);
    }, [props.location]);

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
            <div className='InfoBoxTitle'>Small beer (30c&#8467;)</div>
            <div className='InfoBoxValue'>{(data.total_volume *10/3).toLocaleString(undefined, {maximumFractionDigits:0})} cans</div>
        </div>
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Large beer (50c&#8467;)</div>
            <div className='InfoBoxValue'>{(data.total_volume *10/5).toLocaleString(undefined, {maximumFractionDigits:0})} cans</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Average time to empty barrel</div>
            <div className='InfoBoxValue'>5.1 days</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Unopened barrels</div>
            <div className='InfoBoxValue'>6327 barrels</div>
        </div>        
    </div>
  )
}

