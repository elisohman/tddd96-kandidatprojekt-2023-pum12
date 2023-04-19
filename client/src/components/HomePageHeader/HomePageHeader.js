import React from 'react'
import './HomePageHeader.css'
import edit from '../../image/edit.png'
import alarm from '../../image/alarm.png'

export default function HomePageHeader(props) {
  return ( 
    <div className="HomePageHeaderContent">

      {/*<p className="SensorNumber">{window.location.pathname === "/" ? "Home" : window.location.pathname}</p>*/}
      <p className="SensorNumber">{props.location}</p>
      
      <div className="HomePageHeaderButtons">

        <div className="AlarmButton">

          <a className="ButtonLinks" href="alarms">

            {/* Image should only be shown if there is an alarm */}
            <img src={alarm} id="alarmLogo" alt="Alarm symbol" className="ButtonImage"></img>
            <p className="ButtonText">Alarm</p>

          </a>

        </div>

        <div className="EditButton">

          <a className="ButtonLinks" href="edit">

            <img src={edit} id="editLogo" alt="Edit symbol" className="ButtonImage"></img>
            <p className="ButtonText">Edit</p>

          </a>
          
        </div>

      </div>
    
    </div>
  )
}

