import React, { useState, useEffect, PureComponent } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map'
import './HomePage.css';
import BarChart from "../../components/BarChart/BarChartComp";
import LineChart from "../../components/LineChart/LineChartComp";
import TopCard from "../../components/topCard/topCard";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";

function HomePage(props) {
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
				<HomePageHeader />

				<div className="GridContainer">
					{/*
					<div className="topCards">
						<TopCard />
						<TopCard />
						<TopCard />
						<TopCard />
					</div>
					*/}
					<LineChart data={data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"} width={700} height={300}/>
					{/*<LineChart data={data} xkey={"timestamp"} ykey={"temp"} title={"Temperature"}/>
					<LineChart data={data} xkey={"timestamp"} ykey={"flow"} title={"Flow"}/>
					<BarChart data={data} xkey={"timestamp"} ykey={"unit"} title={"Unit"}/>*/}
				</div>
			</div>
        </div>
    );
}

export default HomePage;