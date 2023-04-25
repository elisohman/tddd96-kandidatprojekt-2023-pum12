import React from 'react'
import './SidebarHeader.css'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function SidebarHeader(props) {
  function detailedView(geo) {
    console.log("onclick detailed view")
    if(props.sidebarState === "largeSidebar") {
      props.setSidebarState("smallSidebar")
      return
    }
    props.setSidebarState("largeSidebar")
  }

  return ( 
    <div className="SidebarHeaderContent">
      <p className="SidebarHeader">{props.location}</p>
      
      <div className="AlarmButton">
        <a className="ButtonLinks" href="alarms">
          {/* Image should be shown in red if there is an alarm */}
          <NotificationsIcon className='Buttons'/>
        </a>
      </div>

      <div className="EnlargeButton">
        <a className="ButtonLinks">
          <OpenInFullIcon className='Buttons' onClick={() => {detailedView()}}/>
        </a>
      </div>
    </div>
  )
}

