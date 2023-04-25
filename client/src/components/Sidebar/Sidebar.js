// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import OverviewBox from "../../components/OverviewBox/OverviewBox";

import TimespanButtons from "../TimespanButtons/TimespanButtons";


//  i denna funktion updaterar man sen data för tabell & graf beroende på knapptryckning
//  Matha med title arrayens ordning, index = 0 är title[0] o.s.v.
function ButtonFunction(index){
    console.log(`${index == 1 ? "Knapp1" : "annan knapp"}`);
}

function Sidebar(props) {
    let location = "World"
    const [sidebarState, setSidebarState] = useState("smallSidebar");
    const [tableData, setTableData] = useState([]);

	useEffect(() => API_call("/product_data/sweden/lappland"), [])
	function API_call(request) {
		fetch(request)
			.then(res => res.json())
			.then(data => setTableData(data))

        // process recieved data
        
	}

	// const tableColumns = [
    //     {
    //         Header: "Amount",
    //         accessor : "unit"
    //     },
    //     {
    //         Header: "Average Flow",
    //         accessor : "flow"
    //     },
    //     {
    //         Header: "Air Pressure",
    //         accessor : "airpressure"
    //     },
	// 	{
    //         Header: "Temperature",
    //         accessor : "temp"
    //     }
    //     ];
    return (
        <div className={sidebarState + "Container"}>
            <div className={sidebarState + "SidebarHeader"} >
                <SidebarHeader 
                    location={location} 
                    setSidebarState={setSidebarState} 
                    sidebarState={sidebarState}/>
            </div>

            <div className={sidebarState + "TableContainer"}>
                <div className={sidebarState + "Table"}>
                <Table data = {tableData} sidebarState={sidebarState}/>
                </div>
                <div className={sidebarState + "TableButtons"}>
                <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
                </div>
            </div>
            <div className={sidebarState + "LineChartContainer1"}>
                <LineChart data={props.data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} sidebarState={sidebarState}/>
            </div>
            <div className={sidebarState + "LineChartContainer2"}>
                <LineChart data={props.data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} sidebarState={sidebarState}/>
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