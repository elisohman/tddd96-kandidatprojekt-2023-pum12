import React, { useMemo } from "react";
import "./Table.css";

/*
    När man skapar en tabell kommer kolumnerna i ordningen som column har(första till sista->vänster till höger).
    Data som skickas in ska ha fälten "Header" Som blir namnet som visas på kollumnen, och "accessor" som är namnet på datan från databasen ex. "unit"
*/

function Table(props){

    const data = useMemo( () => (
        props.data
    ));

    const column = useMemo(()=>(
        props.columns
    ));
    return (
        <div className = "Tbl">
            <table>
                <tr className="Header">
                    {column.map((val, index) => {
                        return (<td key={index}> {val.Header}</td>);
                    })}
                    
                </tr>
                
                {data.map((valData) => {
                    return (<tr>
                        {column.map((colVal, indexVal) => {
                            return(<td key={indexVal}>{valData[colVal.accessor]}</td>);

                })}                   
            </table>
        </div>
    );
}



export default Table;
