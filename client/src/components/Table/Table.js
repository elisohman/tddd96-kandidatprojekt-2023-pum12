import React, { useMemo } from "react";
import "./Table.css";

/*
    När man skapar en tabell kommer kolumnerna i ordningen som column har(första till sista->vänster till höger).
    Data som skickas in ska ha fälten "Header" Som blir namnet som visas på kollumnen, och "accessor" som är namnet på datan från databasen ex. "unit"
*/

function Table(props){
    console.log(props.data);

    var columns = ["Area", "50cl", "30cl", "volume"];

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
        <div className = {props.sidebarState + "Tbl"}>
            <table>
                <thead>
                    <tr className="Header">
                        {columns.map((val, index) => {
                            return (<td key={index}> {val}</td>);
                        })}
                    </tr>
                </thead>

                <tbody>
                    {props.data.map((valData, indexTrData) => {
                        return (
                        <tr key = {indexTrData}>  
                            <td>{valData.country}</td>
                            <td>{valData.volume * 100/30}</td>
                            <td>{valData.volume * 100/50}</td>
                            <td>{valData.volume}</td>
                            {/* {column.map((colVal, indexVal) => {
                                return(<td key={indexVal}>{valData[colVal.accessor]}</td>);
                            })} */}
                        </tr>)
                    })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
