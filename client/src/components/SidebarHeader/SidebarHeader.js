import React from 'react'
import './SidebarHeader.css'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function SidebarHeader(props) {
  return ( 
    <div className="SidebarHeaderContent">
      <p className="SidebarHeader">{props.location}</p>
      
      <div className="AlarmButton">
        <a className="ButtonLinks" href="alarms">
          {/* Image should only be shown if there is an alarm */}
          <NotificationsIcon className='Buttons'/>
        </a>
      </div>

      <div className="EnlargeButton">
        <a className="ButtonLinks" href="enlarge">
          {/* Image should only be shown if there is an alarm */}
          <OpenInFullIcon className='Buttons'/>
        </a>
      </div>
    </div>
  )
}

