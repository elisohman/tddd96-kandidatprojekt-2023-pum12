import React, { useEffect, useState } from "react";
import "./Table.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

/*
    När man skapar en tabell kommer kolumnerna i ordningen som column har(första till sista->vänster till höger).
    Data som skickas in ska ha fälten "Header" Som blir namnet som visas på kollumnen, och "accessor" som är namnet på datan från databasen ex. "unit"
*/

function Table(props){
    const [data, setData] = useState([]);
    const [date, setDate] = useState("1d");
    const [volume, setVolume] = useState("volume_24hours");

    var columns = ["Area", "50cl", "30cl", "Volume (l)"]; //"Barrel turnover",

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        const volumes = ["volume_24hours", "volume_1week", "volume_1month", "volume_1year", "volume_all"];
        setDate(buttons[index]);
        setVolume(volumes[index]);
    }

    useEffect(() => {
        getVolumeTotal(date).then( data => {
            setData(data.volumes);
        })
    }, [date]);

    // Sorting the table
    const allTables = document.querySelectorAll("table");

    for (const table of allTables) {
        const tBody = table.tBodies[0];
        const rows = Array.from(tBody.rows);
        const headerCells = table.tHead.rows[0].cells;

        for (const th of headerCells) {
            const cellIndex = th.cellIndex;

            th.addEventListener("click", () => {
                rows.sort((tr1, tr2) => {
                    const tr1Text = tr1.cells[cellIndex].textContent;
                    const tr2Text = tr2.cells[cellIndex].textContent;
                    if (!isNaN(+tr1Text)) {
                        return tr2Text.localeCompare(tr1Text, undefined, {'numeric': true});
                    } else {
                        return tr1Text.localeCompare(tr2Text);
                    }
            });

            tBody.append(...rows);
            });
        }
    }

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
                                <td className="Number">{Math.floor(valData[volume] * (5/10))}</td>
                                <td className="Number">{Math.floor(valData[volume] * (3/10))}</td>
                                <td className="Number">{Math.round(valData[volume] * 100) / 100}</td>
                            </tr>)
                        })
                        }
                    </tbody>
                </table>
            </div>
            <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
        </div>
    );
}

export default Table;
