import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map'
import './HomePage.css';
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";


function HomePage(props) {
	// Data fetch for graph
	const [data, setData] = useState([]);

	// Using useEffect for single rendering
	useEffect(() => API_call("/data"), [])
	
	function API_call(request) {
		console.log("api call")
		fetch(request)
			.then(res => res.json())
			.then(data => setData(data))
	}
    return (
        <div className="HomePage">
			<div className="HomePageHeader"><HomePageHeader/></div>
			<div className="HomePageContent">
				<div className="Map"><Map/></div>
				<div className="Sidebar"><Sidebar data={data}/></div>			
			</div>
        </div>

    );
}

export default HomePage;