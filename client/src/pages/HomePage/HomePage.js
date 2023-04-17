import React, { useState, useEffect, PureComponent } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import './HomePage.css';
import BarChart from "../../components/BarChart/BarChartComp";
//import LineChart from "../../components/LineChart/LineChartComp"
import TopCard from "../../components/topCard/topCard";
import EditIcon from '@mui/icons-material/Edit';

function HomePage(props) {
    // Data fetch for graph
	const [data, setData] = useState([]);

	// Using useEffect for single rendering
	useEffect(() => API_call("/data"), [])
	//useEffect(() => API_call("/alldata"), [])
	
	function API_call(request) {
		console.log("api")
		fetch(request)
			.then(res => res.json())
			.then(data => setData(data))
	}

	//console.log(data)
	const data2 = [
		{
			"unit": 4,
			"flow": 5,
			"Air pressure": 6,
			"temp": 7,
			"Timestamp": 1
		},
		{
			"unit": 1,
			"flow": 2,
			"Air pressure": 3,
			"temp": 4,
			"Timestamp": 2
		},
		{
			"unit": 8,
			"flow": 8,
			"Air pressure": 8,
			"temp": 8,
			"Timestamp": 3
		},
		{
			"unit": 2,
			"flow": 2,
			"Air pressure": 2,
			"temp": 2,
			"Timestamp": 4
		},
		{
			"unit": 5,
			"flow": 5,
			"Air pressure": 5,
			"temp": 5,
			"Timestamp": 5
		}



	]

    return (
        <div className="HomePageContent">
			<Sidebar />
            
			<div className="GridContainer">
				<div className="topCards">
					<TopCard />
					<TopCard />
					<TopCard />
					<TopCard />
				</div>
				<BarChart data={data} xkey={"timestamp"} ykey={"airpressure"} title={"Air Pressure"}/>
				<BarChart data={data} xkey={"timestamp"} ykey={"temp"} title={"Temperature"}/>
				<BarChart data={data} xkey={"timestamp"} ykey={"flow"} title={"Flow"}/>
				<BarChart data={data} xkey={"timestamp"} ykey={"unit"} title={"Unit"}/>

			</div>
        </div>
    );
}

export default HomePage;