import React, { useEffect, useState } from "react";
import "./Table.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

/*
    När man skapar en tabell kommer kolumnerna i ordningen som column har(första till sista->vänster till höger).
    Data som skickas in ska ha fälten "Header" Som blir namnet som visas på kollumnen, och "accessor" som är namnet på datan från databasen ex. "unit"
*/

function Table(props){
    const [buttonsAreDisabled, setButtonsAreDisabled] = useState(true);
    const [data, setData] = useState([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
    const [date, setDate] = useState("1d");
    const [location, setLocation] = useState(props.location);

    var columns = ["Area", "50 cl", "30 cl", "Volume (L)"];

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        setDate(buttons[index]);
    }

    useEffect(() => {
        setLocation(props.location);
    }, [props.location]);

    useEffect(() => {

        getVolumeTotal(date, location).then( data => {
            if (data.volumes.length === 0) setData([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
            else setData(data.volumes);
            setButtonsAreDisabled(false);
        })
        
    }, [location, date]);

    return (
        <div>
            <div className = {props.sidebarState + "Tbl"}>
                <table id="VolumeTable">
                    <thead>
                        <tr>
                            {columns.map((val, index) => {
                                return (<td key={index} className="Header"> {val}</td>);
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((valData, indexTrData) => {
                            return (
                            <tr key = {indexTrData}>  
                                <td className="Location">{valData.location}</td>
                                <td className="Number">{Math.floor((valData["total_volume"] * (10/5)))}</td>
                                <td className="Number">{Math.floor((valData["total_volume"] * (10/3)))}</td>
                                <td className="Number">{valData["total_volume"].toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                            </tr>)
                        })
                        }
                    </tbody>
                </table>
            </div>
            <TimespanButtons parentFunction = {ButtonFunction} isDisabled = {buttonsAreDisabled} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
        </div>
    );
}

export default Table;
