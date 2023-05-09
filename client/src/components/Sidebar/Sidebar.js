// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import OverviewBoxBeers from "../OverviewBoxBeers/OverviewBoxBeers";
import OverviewBoxLiters from "../OverviewBoxLiters/OverviewBoxLiters";
import { getVolumeSeries } from '../../apis/VolumeAPI';
import AlarmHeader from "../../components/AlarmHeader/AlarmHeader"
import Notification from "../../components/Notification/Notification";
import { NotificationsData } from "./NotificationsData";


//  I denna funktion updaterar man sen data för tabell & graf beroende på knapptryckning
//  Matha med title arrayens ordning, index = 0 är title[0] o.s.v.

function Sidebar(props) {
    const [sidebarState, setSidebarState] = useState("smallSidebar");
    const [prevSidebarState, setPrevSidebarState] = useState("smallSidebar");
    const [location, setLocation] = useState(props.location);
    

    useEffect(() => {
        setLocation(props.location);
    }, [props.location]);

    function changeMapShowing(state) {
        props.parentFunction(state);
    }

    return (
        <div className={sidebarState + "Container"}>
            <div className={sidebarState + "SidebarHeader"} >
                <div className={`${sidebarState === "alarm" ? "hiddenHeader" : 'showHeader'}`}>
                <SidebarHeader
                    setPrevState = {setPrevSidebarState}
                    prevSidebarState = {prevSidebarState}
                    location={location} 
                    setSidebarState={setSidebarState} 
                    sidebarState={sidebarState}
                    parentFunction={changeMapShowing}/>
                </div>
                <div className={`${sidebarState !== "alarm" ? "hiddenHeader" : 'showHeader'}`}>
                <AlarmHeader 
                    setPrevState = {setPrevSidebarState}
                    prevSidebarState = {prevSidebarState}
                    location={location} setSidebarState={setSidebarState}
                    sidebarState={sidebarState}
                    parentFunction={changeMapShowing}/>
                </div> 
            </div>
            
            <div className={sidebarState + "Notifications"}>
                {NotificationsData.map((item, index) => {
                    return <Notification location = {item.location} unit = {item.unit} alarm = {item.alarm} timestamp = {item.timestamp} read = {item.read}/>
                })};
            </div>
            
            <div className={sidebarState + "TableContainer"}>
                <div className={sidebarState + "Table"}>
                <Table sidebarState={sidebarState} location={location}/>
                </div>
                <div className={sidebarState + "TableButtons"}>
                </div>
            </div>
            <div className={sidebarState + "LineChartContainer1"}>
                <LineChart dataAPI={getVolumeSeries} xkey={"timestamp"} ykey={"total_volume"} title={"Volume tapped (l)"} width={700} height={300} location={location}/>
            </div>
            <div className={sidebarState + "LineChartContainer2"}>
                <LineChart dataAPI={getVolumeSeries} xkey={"timestamp"} ykey={"total_volume"} title={"Volume tapped (l)"} sidebarState={sidebarState} location={location}/>
            </div>
            <div className={sidebarState + "OverviewBox"}>
                <OverviewBoxBeers location={location}/>
            </div>
            <div className={sidebarState + "OverviewBox"}>
                <OverviewBoxLiters location={location} dataAPI={getVolumeSeries}/>
            </div>

        </div>
    );
}

export default Sidebar;
