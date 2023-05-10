import React from 'react'
import './SidebarHeader.css'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function SidebarHeader(props) {
  function detailedView(geo) {
    console.log("onclick detailed view")
    props.setPrevState(props.sidebarState);
    if(props.sidebarState === "largeSidebar") {
      props.parentFunction("smallSidebar");
      props.setSidebarState("smallSidebar");
      return
    }
    props.parentFunction("largeSidebar");
    props.setSidebarState("largeSidebar");
  }

  function alarmView() {
    props.parentFunction("largeSidebar");
    props.setPrevState(props.sidebarState);
    props.setSidebarState("alarm");
  }

  return ( 
    <div className="SidebarHeaderContent">
      <p className="SidebarHeader">{props.location}</p>
      
      <div className="AlarmButton">
        {/* Image should show in red if there is an alarm */}
        <NotificationsIcon className='Buttons' onClick={() => {alarmView()}} />
      </div>

      <div className="EnlargeButton">
        {props.sidebarState === "smallSidebar" ? (
          <OpenInFullIcon className='Buttons' onClick={() => {detailedView()}}/>
        ) : (
          <CloseFullscreenIcon className='Buttons' onClick={() => {detailedView()}}/>
        )}
      </div>
    </div>
  )
}

