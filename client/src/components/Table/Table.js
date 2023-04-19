import React, { useMemo } from "react";
import "./Table.css";

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
                    </tr>)
                })}                   
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
