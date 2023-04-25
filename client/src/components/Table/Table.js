import React, { useState } from "react";
import "./Table.css";
import TimespanButtons from "../TimespanButtons/TimespanButtons";

/*
    När man skapar en tabell kommer kolumnerna i ordningen som column har(första till sista->vänster till höger).
    Data som skickas in ska ha fälten "Header" Som blir namnet som visas på kollumnen, och "accessor" som är namnet på datan från databasen ex. "unit"
*/

function Table(props){
    const [date, setDate] = useState("1d");

    var columns = ["Area", "50cl", "30cl", "Volume (l)"]; //"Barrel turnover",

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        setDate(buttons[index]);
    }

    // var tableData = calculateTableData(props.data);

    // function calculateTableData(data){
    //     var tableData = [];
    //     for(var i = 0; i < data.length; i++){
    //         var volume = data[i].volume;
    //         var area = data[i].area;
    //         var fifty = volume *100/30;
    //         var thirty = volume *100/50;
            
    //         tableData.push([area, fifty, thirty, volume]);
    //     }
    //     console.log("tableData");
    //     console.log(tableData);
    //     return tableData;
    // }

    return (
        <div>
            <div className = {props.sidebarState + "Tbl"}>
                <table>
                    <thead>
                        <tr>
                            {columns.map((val, index) => {
                                return (<td key={index} className="Header"> {val}</td>);
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {props.data.map((valData, indexTrData) => {
                            return (
                            <tr key = {indexTrData}>  
                                <td className="Location">{valData.name}</td>
                                <td className="Number">{Math.round(valData[date] * (5/10))}</td>
                                <td className="Number">{Math.round(valData[date] * (3/10))}</td>
                                {/* <td>{valData.BarrelTurnover}</td> */}
                                <td className="Number">{Math.round((valData[date]) * 100) / 100}</td>
                                {/* {column.map((colVal, indexVal) => {
                                    return(<td key={indexVal}>{valData[colVal.accessor]}</td>);
                                })} */}
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
