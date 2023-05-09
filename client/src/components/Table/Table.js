import React, { useEffect, useState } from "react";
import "./Table.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { getVolumeTotal } from "../../apis/VolumeAPI.js";

/*
    När man skapar en tabell kommer kolumnerna i ordningen som column har(första till sista->vänster till höger).
    Data som skickas in ska ha fälten "Header" Som blir namnet som visas på kollumnen, och "accessor" som är namnet på datan från databasen ex. "unit"
*/

function Table(props){
    const [data, setData] = useState([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
    const [date, setDate] = useState("1d");
    const [location, setLocation] = useState(props.location);

    var columns = ["Area", "50cl", "30cl", "Volume (L)"];

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        setDate(buttons[index]);
    }

    useEffect(() => {
        setLocation(props.location);
    }, [props.location]);

    useEffect(() => {
        if (location === "World") {
            getVolumeTotal(date).then( data => {
                if (data.volumes.length === 0) setData([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
                else setData(data.volumes);
            })
        }
        else {
            getVolumeTotal(date, location).then( data => {
                if (data.volumes.length === 0) setData([{"location": NaN.toString(), "total_volume": NaN.toString()}]);
                else setData(data.volumes);
            })
        }
    }, [location, date]);

    // function reverseString(str) {
    //     return str.split('').reverse().join('');
    // }

    // function transform(str) {
    //     let str1 = str.split(",");
    //     if (str1.length > 1) {
    //         let str2 = reverseString(str1[0]);
    //         str2 = str2.replace(/(.{3})./g,"$1");
    //         str2 = reverseString(str2);
    //         return str2 + str1[1];
    //     }
    //     else {
    //         let str2 = reverseString(str);
    //         str2 = str2.replace(/(.{3})./g,"$1");
    //         str2 = reverseString(str2);
    //         return str2;
    //     }
    // }

    // // Sorting the table
    // const allTables = document.querySelectorAll("table");

    // for (const table of allTables) {
    //     const tBody = table.tBodies[0];
    //     const rows = Array.from(tBody.rows);
    //     const headerCells = table.tHead.rows[0].cells;

    //     for (const th of headerCells) {
    //         const cellIndex = th.cellIndex;

    //         th.addEventListener("click", () => {
    //             rows.sort((tr1, tr2) => {
    //                 const tr1Text = tr1.cells[cellIndex].textContent;
    //                 const tr2Text = tr2.cells[cellIndex].textContent;
    //                 let transformedTr1 = transform(tr1Text);
    //                 let transformedTr2 = transform(tr2Text);
    //                 if (!isNaN(+transformedTr1)) {
    //                     return transformedTr2.localeCompare(transformedTr1, undefined, {'numeric': true});
    //                 } else {
    //                     return tr1Text.localeCompare(tr2Text);
    //                 }
    //         });

    //         tBody.append(...rows);
    //         });
    //     }
    // }

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
            <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
        </div>
    );
}

export default Table;
