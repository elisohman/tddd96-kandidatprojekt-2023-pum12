import React, { useEffect, useMemo, useState } from "react";
import "./Table.css";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

function Table(props){

    const data = useMemo( () => (
        //props.data
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

    ));

    const column = useMemo(()=>(
        //props.columns
        [
            {
                Header: "Country",
                accessor: "unit"
            },
            {
                Header: "Avg Time",
                accessor: "flow"
            },
            {
                Header: "Tapped (l)",
                accessor: "airpressure"
            }
            ]
    ));

    const tableInstance = useTable({column, data});

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return <Table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup,) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.map((column) => (
                        <th {...column.getHeaderProps()}>{ column.render("Header") }</th>
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
    </Table>;
}



export default Table;