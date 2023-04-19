// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";

function Sidebar(props) {
    let location = "World"
	const tableColumns = [
        {
            Header: "Amount",
            accessor : "unit"
        },
        {
            Header: "Average Flow",
            accessor : "flow"
        },
        {
            Header: "Air Pressure",
            accessor : "airpressure"
        },
		{
            Header: "Temperature",
            accessor : "temp"
        }
        ];
    return (
        <div className='SidebarContainer'>
            <SidebarHeader location={location}/>
                <div className="TableContainer">
                    <Table data = {props.data} columns = {tableColumns}/>
                </div>
                <div className="LineChartContainer">
                    <LineChart data={props.data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} width={700} height={300}/>
                </div>
        </div>
    );
}

export default Sidebar;