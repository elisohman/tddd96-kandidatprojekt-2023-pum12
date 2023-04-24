import React from 'react'
import './SidebarHeader.css'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function SidebarHeader(props) {
  function detailedView(geo) {
    console.log("onclick detailed view")
    props.setPrevState(props.sidebarState);
    if(props.sidebarState === "largeSidebar") {
      props.setSidebarState("smallSidebar")
      return
    }

    props.setSidebarState("largeSidebar")
  }

  function alarmView(){
    console.log("Alarm view");
    props.setPrevState(props.sidebarState);
    props.setSidebarState("alarm");
  }

  return ( 
    <div className="SidebarHeaderContent">
      <p className="SidebarHeader">{props.location}</p>
      
      <div className="AlarmButton">
        {/* <a className="ButtonLinks" href="alarms"> */}
          {/* Image should only be shown if there is an alarm */}
          <NotificationsIcon className='Buttons' onClick={() => {alarmView()}} />
        {/* </a> */}
      </div>

      <div className="EnlargeButton">
        <a className="ButtonLinks" > {/*href="germany/detailed_page"}
          {/* Image should only be shown if there is an alarm */}
          <OpenInFullIcon className='Buttons' onClick={() => {detailedView()}}/>
        </a>
      </div>
    </div>
  )
}

