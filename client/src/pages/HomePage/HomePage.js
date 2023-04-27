import React, { useState } from "react";
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map'
import './HomePage.css';
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";


function HomePage(props) {
	const [layer, setLayer] = useState("");
	
    return (
        <div className="HomePage">
			<div className="HomePageHeader"><HomePageHeader/></div>
			<div className="HomePageContent">
				<div className="Map"><Map/></div>
				<div className="Sidebar"><Sidebar/></div>			
			</div>
        </div>

    );
}

export default HomePage;