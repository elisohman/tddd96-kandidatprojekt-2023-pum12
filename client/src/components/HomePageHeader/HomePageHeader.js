import React from 'react'
import './HomePageHeader.css'
import edit from '../../image/edit.png'
import alarm from '../../image/alarm.png'

export default function HomePageHeader() {
  return ( 
    <div className="HomePageHeaderContent">

      <p className="SensorNumber">Sensor 001</p>
      
      <div className="HomePageHeaderButtons">

        <a className="ButtonLinks" href="alarms">
          <div className="AlarmButton">

            {/* Image should only be shown if there is an alarm */}
            <img src={alarm} id="alarmLogo" alt="Alarm symbol" className="ButtonImage"></img>
            <p className="ButtonText">Alarm</p>

          </div>
        </a>

        <a className="ButtonLinks" href="edit">
          <div className="EditButton">

            <img src={edit} id="editLogo" alt="Edit symbol" className="ButtonImage"></img>
            <p className="ButtonText">Edit</p>

          </div>
        </a>

      </div>
    
    </div>
  )
}

