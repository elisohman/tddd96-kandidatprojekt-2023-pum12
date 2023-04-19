import React from "react";
import "./SidebarMap.css";
import LineChart from "../LineChart/LineChartComp"
import Table from"../Table/Table";


export default function SidebarMap(props){
    return(
    <>
    <Table data = {props.data} columns = {props.tableColumns}/>
    <LineChart data={props.data} xkey={props.xkey} ykey={props.ykey} title={props.title} width={props.width} height={props.height}/>
    </>)
}