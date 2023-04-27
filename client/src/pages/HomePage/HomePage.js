import React, { useState } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map'
import './HomePage.css';
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";


function HomePage() {
	const [location, setLocation] = useState("World");
	const [sidebarState, setSidebarState] = useState("smallSidebar");

	function changeLocation(loc) {
		setLocation(loc);
	}

	function changeMapShowing(state) {
		setSidebarState(state);
	}
	
    return (
        <div className="HomePage">
			<div className="HomePageHeader"><HomePageHeader/></div>
			<div className="HomePageContent">
				<div className={sidebarState + "Map"}><Map parentFunction={changeLocation}/></div>
				<div className="Sidebar"><Sidebar location={location} parentFunction={changeMapShowing}/></div>			
			</div>
        </div>

    );
}

export default HomePage;