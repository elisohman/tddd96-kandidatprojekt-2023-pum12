import React, { useState, useEffect, PureComponent } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map'
import './HomePage.css';
import BarChart from "../../components/BarChart/BarChartComp";
import TopCard from "../../components/topCard/topCard";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader"

function HomePage(props) {
    // Data fetch for graph
	const [data, setData] = useState([{
		unit: 0,
		flow: 0,
		airpressure: 0,
		temp: 0,
		timestamp: 0
	}]);

	// Using useEffect for single rendering
	useEffect(() => API_call("/data"), [])

	function API_call(request) {
		fetch(request)
			.then(res => res.json())
			.then(res => {
				// Setting a data from api
				// console.log(data);
				setData([
					{name: "unit", num: res.unit},
					{name: "flow", num: res.flow},
					{name: "airpressure", num: res.airpressure},
					{name: "temp", num: res.temp},
					{name: "timestamp", num: res.timestamp}
				])
				}
	)
	}
    return (
        <div className="HomePageContent">
			<Map/>

			<div className="SensorData">
				<HomePageHeader />

				<div className="GridContainer">

					<div className="topCards">
						<TopCard />
						<TopCard />
						<TopCard />
						<TopCard />
					</div>
					<BarChart data={data}/>
					<BarChart data={data}/>
					<BarChart data={data}/>
					<BarChart data={data}/>
				</div>
			</div>
        </div>

    );
}

export default HomePage;