// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React, { useState } from "react";
import "./Sidebar.css";
import LineChart from "../../components/LineChart/LineChartComp";
import SidebarHeader from "../../components/SidebarHeader/SidebarHeader";
import Table from "../../components/Table/Table";
import OverviewBox from "../../components/OverviewBox/OverviewBox";
import { getVolumeSeries } from '../../apis/VolumeAPI';
import AlarmHeader from "../../components/AlarmHeader/AlarmHeader"
import Notification from "../../components/Notification/Notification";


//  I denna funktion updaterar man sen data för tabell & graf beroende på knapptryckning
//  Matha med title arrayens ordning, index = 0 är title[0] o.s.v.

function Sidebar(props) {
    const [sidebarState, setSidebarState] = useState("smallSidebar");
    const [prevSidebarState, setPrevSidebarState] = useState("smallSidebar");
    const [location, setLocation] = useState("World"); // TODO: Set the location

    return (
        <div className={sidebarState + "Container"}>
            <div className={sidebarState + "SidebarHeader"} >
                <div className={`${sidebarState === "alarm" ? "hiddenHeader" : 'showHeader'}`}>
                <SidebarHeader
                    setPrevState = {setPrevSidebarState}
                    prevSidebarState = {prevSidebarState}
                    location={location} 
                    setSidebarState={setSidebarState} 
                    sidebarState={sidebarState}/>
                </div>
                <div className={`${sidebarState !== "alarm" ? "hiddenHeader" : 'showHeader'}`}>
                <AlarmHeader 
                    setPrevState = {setPrevSidebarState}
                    prevSidebarState = {prevSidebarState}
                    location={location} setSidebarState={setSidebarState}
                    sidebarState={sidebarState}/>
                </div> 
            </div>
            
            <div className={sidebarState + "Notifications"}>
                <Notification location = {"Första"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {false}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sverige"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
                <Notification location = {"Sista"} unit = {69} alarm = {"för mycket öl!"} timestamp = {"28/03/2023 19:53"} read = {true}/>
            </div>
            
            <div className={sidebarState + "TableContainer"}>
                <div className={sidebarState + "Table"}>
                <Table sidebarState={sidebarState}/>
                </div>
                <div className={sidebarState + "TableButtons"}>
                </div>
            </div>
            <div className={sidebarState + "LineChartContainer1"}>
                <LineChart dataAPI={getVolumeSeries} xkey={"timestamp"} ykey={"total_volume"} title={"Volume tapped (\u2113)"} width={700} height={300}/>
            </div>
            <div className={sidebarState + "LineChartContainer2"}>
                <LineChart dataAPI={getVolumeSeries} xkey={"timestamp"} ykey={"total_volume"} title={"Volume tapped (\u2113)"} sidebarState={sidebarState}/>
            </div>
            <div className={sidebarState + "OverviewBox"}>
                <OverviewBox />
            </div>
            <div className={sidebarState + "OverviewBox"}>
                <OverviewBox />
            </div>

        </div>
    );
}

export default Sidebar;
