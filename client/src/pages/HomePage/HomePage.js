import React, { useState, useEffect, PureComponent } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map'
import './HomePage.css';
import BarChart from "../../components/BarChart/BarChartComp";
import LineChart from "../../components/LineChart/LineChartComp";
import TopCard from "../../components/topCard/topCard";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import SidebarMap from "../../components/SidebarMap/SidebarMap";

function HomePage(props) {
	//
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
		/*col 1: "amount": "unit"
*/

    // Data fetch for graph
	const [data, setData] = useState([]);

	// Using useEffect for single rendering
	useEffect(() => API_call("/data"), [])
	//useEffect(() => API_call("/alldata"), [])
	
	function API_call(request) {
		console.log("api call")
		fetch(request)
			.then(res => res.json())
			.then(data => setData(data))
	}
	
    return (
        <div className="HomePageContent">
			<Map/>

			<div className="SensorData">
				<HomePageHeader location={location}/>
				<div className="Sidebar">
					<div className="TableContainer">
						<Table data = {data} columns = {tableColumns}/>
					</div>
					<div className="GridContainer">
						<LineChart data={data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} width={700} height={300}/>
					</div>
				</div>
			</div>
        </div>
    );
}

export default HomePage;

/*<LineChart data={data} xkey={"timestamp"} ykey={"temp"} title={"Temperature"}/>
					<LineChart data={data} xkey={"timestamp"} ykey={"flow"} title={"Flow"}/>
					<BarChart data={data} xkey={"timestamp"} ykey={"unit"} title={"Unit"}/>*/
/*
					<div className="topCards">
						<TopCard />
						<TopCard />
						<TopCard />
						<TopCard />
					</div>

					/*<Table data = {data} columns = {tableColumns}/>*/
					