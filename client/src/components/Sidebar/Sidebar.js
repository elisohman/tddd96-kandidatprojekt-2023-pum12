// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState, useEffect, PureComponent } from "react";
import "./Sidebar.css";
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import SidebarSearch from "../SidebarSearch/SidebarSearch";

function Sidebar(props) {
    // Get json data from server what sensors and units are available
    const [sensorJSON, setSensorJSON] = useState({"units":[]});

	useEffect(() => API_call("/sensors"), []) // TODO implement API_call in server side
	function API_call(request) {
		fetch(request)
			.then(res => res.json())
			.then(res => {setSensorJSON(res);	})
        

	}
    return (
        <div className='Sidebar'>
            <SidebarHeader/> 
            <SidebarSearch/>
            <SidebarMenu data={sensorJSON}/>
        </div>
    );
}

export default Sidebar;