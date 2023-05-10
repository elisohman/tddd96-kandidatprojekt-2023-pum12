import React, { useEffect, useState } from "react";
import "./OverviewBoxLiters.css";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

export default function OverviewBoxLiters(props) {
    const [data, setData] = useState({"1d":0, "1w":0, "1m":0, "1y":0, "all":0});
    const timeSpan = ["1d", "1w", "1m", "1y", "all"];

    // Call API with all timespans and save them in "data"
    useEffect(() => {
        let all_totals = {};
            timeSpan.forEach( (span) => {
                getVolumeTotal(span, props.location).then( data => {
                    if (data.volumes.length === 0) setData({"1d":0, "1w":0, "1m":0, "1y":0, "all":0});
                    else all_totals[span] = data.total_volume.toLocaleString(undefined, {maximumFractionDigits:0});
                })
            });
        setData(all_totals);
    }, [props.location]);

  return (
    <div className="OverviewBoxContainer"> {/* &#8467; */}
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped day (L)</div>
            <div className='InfoBoxValue'>{
            data["1d"]
            } L</div>
        </div>
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped week (L)</div>
            <div className='InfoBoxValue'>{
            data["1w"]
            } L</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped month (L)</div>
            <div className='InfoBoxValue'>{
            data["1m"]
            } L</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Tapped year (L)</div>
            <div className='InfoBoxValue'>{
            data["1y"]
            } L</div>
        </div>        
    </div>
  )
}

