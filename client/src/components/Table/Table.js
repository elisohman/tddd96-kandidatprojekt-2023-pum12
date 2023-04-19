import React, { useEffect, useMemo, useState } from "react";
import "./Table.css";

function Table(props){

    const data = useMemo( () => (
        props.data
        /*
        [
            {
                "unit": 4,
                "flow": 5,
                "airpressure": 6,
                "temp": 7,
                "Timestamp": 1
            },
            {
                "unit": 1,
                "flow": 2,
                "airpressure": 3,
                "temp": 4,
                "Timestamp": 2
            },
            {
                "unit": 8,
                "flow": 8,
                "airpressure": 8,
                "temp": 8,
                "Timestamp": 3
            },
            {
                "unit": 2,
                "flow": 2,
                "airpressure": 2,
                "temp": 2,
                "Timestamp": 4
            },
            {
                "unit": 5,
                "flow": 5,
                "airpressure": 5,
                "temp": 5,
                "Timestamp": 5
            }
    
        ]    
        */

    ));

    const column = useMemo(()=>(
        props.columns
        /*
        [
            {
                Header: "Country",
                accessor: "data.unit"
            },
            {
                Header: "Avg Time",
                accessor: "data.flow"
            },
            {
                Header: "Tapped (l)",
                accessor: "data.airpressure"
            }
            ]
            */
    ));

   // const tableInstance = useTable({column, data});




    //const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;


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
                    </tr>)
                })
                }
                
               
                {/*}
                {data.map((valData) => {
                        <tr>
                        for (let i = 0; i < column.length; i ++){
                            return (<td>{valData.column[i].accessor}</td>)
                        }
                        </tr>
                    })}*/}

                {
                    
            }
            </table>
        </div>
    );
    /*
<td>{val.unit}</td>
<td>{val.flow}</td>
<td>{val.temp}</td>





    return (
    <>
    <Table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup,) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.map((columns) => (
                        <th {...columns.getHeaderProps()}>{ columns.render("Header") }</th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);

                return row.cells.map((cell, idx) => (
                    <td {...cell.getCellProps()}>{ cell.render("cell") }</td>
                ))
            })}
        </tbody>
    </Table>
    </>
    );
    */
}



export default Table;
