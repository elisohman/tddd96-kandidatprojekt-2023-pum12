// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import OverviewBox from "../../components/OverviewBox/OverviewBox";

function Sidebar(props) {
    let location = "World"
    const [sidebarState, setSidebarState] = useState("smallSidebar");

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
        <div className={sidebarState + "Container"}>
            <div className={sidebarState + "SidebarHeader"} >
                <SidebarHeader 
                    location={location} 
                    setSidebarState={setSidebarState} 
                    sidebarState={sidebarState}/>
            </div>

            <div className={sidebarState + "TableContainer"}>
                <Table data = {props.data} columns = {tableColumns}/>
            </div>
            <div className={sidebarState + "LineChartContainer1"}>
                <LineChart data={props.data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} width={700} height={300}/>
            </div>
            <div className={sidebarState + "LineChartContainer2"}>
                <LineChart data={props.data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} width={700} height={300}/>
            </div>
            <div className={sidebarState + "OverviewBox"}>
                <OverviewBox />
            </div>
            <div className={sidebarState + "OverviewBox"}>
                <OverviewBox />
            </div>
        </div>
    );
}

export default Sidebar;