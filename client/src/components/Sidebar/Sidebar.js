// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import OverviewBox from "../../components/OverviewBox/OverviewBox";
import AlarmHeader from "../../components/AlarmHeader/AlarmHeader"
import Notification from "../../components/Notification/Notification";
import TimespanButtons from "../TimespanButtons/TimespanButtons";
import { csv } from "d3-fetch";

function Sidebar(props) {
    const [location, setLocation] = useState("World"); // TODO: Set the location
    const [sidebarState, setSidebarState] = useState("smallSidebar");
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        csv(`/product_data/sweden/lappland`).then((data) => { // TODO: Use variables, not sweden/lappland
        setTableData(data);
        });
    }, []);

//  i denna funktion updaterar man sen data för tabell & graf beroende på knapptryckning
//  Matha med title arrayens ordning, index = 0 är title[0] o.s.v.
function ButtonFunction(index){
    console.log(`${index == 1 ? "Knapp1" : "annan knapp"}`);//exempelkod
}

function Sidebar(props) {
    let location = "World"
    const [sidebarState, setSidebarState] = useState("smallSidebar");
    const [prevSidebarState, setPrevSidebarState] = useState("smallSidebar");

	const tableColumns = [//exempelkod
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

	// useEffect(() => API_call("/product_data/sweden/lappland"), [])
	// function API_call(request) {
    //     // TODO: Make this to csv somehow
	// 	fetch(request)
	// 		.then(res => res.json())
	// 		.then(data => setTableData(data))

    //     // process recieved data
        
	// }

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
    //console.log(window.location.pathname)

    return (
        <div className={sidebarState + "Container"}>
            <div className={sidebarState + "SidebarHeader"} >
                <div className={`${sidebarState === "alarm" ? "hiddenHeader" : 'showHeader'}`}>
                <SidebarHeader
                    setPrevState = {setPrevSidebarState}
                    prevSidebarState = {prevSidebarState}
                    location={location} 
                    setSidebarState={setSidebarState} 
                    sidebarState={sidebarState}/>
                </div>
                <div className={`${sidebarState != "alarm" ? "hiddenHeader" : 'showHeader'}`}>
                <AlarmHeader 
                    setPrevState = {setPrevSidebarState}
                    prevSidebarState = {prevSidebarState}
                    location={location} setSidebarState={setSidebarState}
                    sidebarState={sidebarState}/>
                </div> 
            </div>
            
            <div className={sidebarState + "Notifications"}>
                <Notification location = {"Första"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sista"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
            </div>
            
            <div className={sidebarState + "TableContainer"}>
                <div className={sidebarState + "Table"}>
                <Table data = {tableData} sidebarState={sidebarState}/>
                </div>
                <div className={sidebarState + "TableButtons"}>
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