// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import TimespanButtons from "../TimespanButtons/TimespanButtons";


//  i denna funktion updaterar man sen data för tabell & graf beroende på knapptryckning
//  Matha med title arrayens ordning, index = 0 är title[0] o.s.v.
function ButtonFunction(index){
    console.log(`${index == 1 ? "Knapp1" : "annan knapp"}`);
}

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
                    <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
                </div>
                <div className="LineChartContainer">
                    <LineChart data={props.data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} width={700} height={300}/>
                </div>
        </div>
    );
}

export default Sidebar;