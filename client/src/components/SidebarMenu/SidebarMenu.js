import React from 'react'
import './SidebarMenu.css'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function SidebarMenu(props) {
  // console.log(props.data["units"])

  return (
    <div className='SidebarMenuContent'>

      <div className='SidebarMenuContainer'>
      <div className='HeaderSensors'>Sensors</div>
      <div className='HeaderFlow'>Flow</div>
      

        {
          props.data["units"].map((unit) => {return(
            <>
              <div className='MenuItemName Unit BottomBorder'
                onClick={() => {window.location.pathname = unit["id"]}}
                id={window.location.pathname === "/"+unit["id"] ? "Selected" : ""}
              >{unit["name"]}</div>
              {/* <div className='Alarms BottomBorder'>{unit["alarms"].lenght===0?"a":"b"}</div> */}
              <div className='Alarms BottomBorder'>{unit["alarms"].map((alarm) => {return(
                <>
                <ReportProblemIcon fontSize="small"/>
                {alarm["id"]}
                </>
              )})}</div>
              {console.log(unit["alarms"].lenght)}
              <div className='SensorValue BottomBorder'>{unit["flow"]}</div>
              
            {unit["sensors"].map((sensor) => {return(
              <>
                <div className='MenuItemName Sensor'
                  onClick={() => {window.location.pathname = unit["id"]+"/"+sensor["id"]}}
                  id={window.location.pathname === "/"+unit["id"]+"/"+sensor["id"] ? "Selected" : ""}
                  >{sensor["name"]}</div>
                <div className='Alarms'>{sensor["alarms"].map((alarm) => {return(
                  <>
                    <ReportProblemIcon fontSize="small"/>
                    {alarm["id"]}
                  </>
                )})}</div>
                <div className='SensorValue'>{sensor["flow"]}</div> 
                
              </>
            )})}
            </>
          )})
        }
      </div>

    </div>

  )
}
