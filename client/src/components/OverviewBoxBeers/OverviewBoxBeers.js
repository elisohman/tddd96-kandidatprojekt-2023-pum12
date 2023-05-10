import React, { useEffect, useState } from "react";
import "./OverviewBoxBeers.css";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

export default function SidebarHeader(props) {
    const [data, setData] = useState([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
    const timespan = "all";

    // Call API with and save in "data"
    useEffect(() => {
        getVolumeTotal(timespan, props.location).then( data => {
            if (data.volumes.length === 0) setData([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
            else setData(data);
        })
        
    }, [props.location]);

  return ( 
    <div className="OverviewBoxContainer">
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Total small beers (30 cl)</div>
            <div className='InfoBoxValue'>{(data.total_volume *10/3).toLocaleString(undefined, {maximumFractionDigits:0})} cans</div>
        </div>
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Total large beers (50 cl)</div>
            <div className='InfoBoxValue'>{(data.total_volume *10/5).toLocaleString(undefined, {maximumFractionDigits:0})} cans</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Average time to empty barrel</div>
            <div className='InfoBoxValue'>5.1 days</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Total unopened barrels</div>
            <div className='InfoBoxValue'>6327 barrels</div>
        </div>        
    </div>
  )
}

