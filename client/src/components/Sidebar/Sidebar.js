// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import OverviewBox from "../../components/OverviewBox/OverviewBox";
import { getVolumeSeries } from '../../apis/VolumeAPI';

import TimespanButtons from "../TimespanButtons/TimespanButtons";

//  I denna funktion updaterar man sen data för tabell & graf beroende på knapptryckning
//  Matha med title arrayens ordning, index = 0 är title[0] o.s.v.
function ButtonFunction(index){
    console.log(`${index == 1 ? "Knapp1" : "annan knapp"}`);
}

function Sidebar(props) {
    let location = "World"
    const xkeys1 = ["timestamp_hour", "timestamp_day", "timestamp_day", "timestamp_month", "timestamp_month"];
    const xkeys2 = ["timestamp_hour", "timestamp_day", "timestamp_day", "timestamp_month", "timestamp_month"];
    const [sidebarState, setSidebarState] = useState("smallSidebar");
    const [tableData, setTableData] = useState([]);

	useEffect(() => API_call("/product_data/sweden/lappland"), [])
	function API_call(request) {
		fetch(request)
			.then(res => res.json())
			.then(data => setTableData(data))
	}

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
                <LineChart dataAPI={getVolumeSeries} xkeys={xkeys1} ykey={"total_volume"} title={"Volume tapped (l)"} width={700} height={300}/>
            </div>
            <div className={sidebarState + "LineChartContainer2"}>
                <LineChart dataAPI={getVolumeSeries} xkeys={xkeys2} ykey={"total_volume"} title={"Volume tapped (l)"} sidebarState={sidebarState}/>
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