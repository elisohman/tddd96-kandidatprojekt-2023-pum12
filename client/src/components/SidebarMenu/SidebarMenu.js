import React from 'react'
import './SidebarMenu.css'

export default function SidebarMenu(props) {
  console.log(window.location.pathname)

  return (
    <div className='SidebarMenuContent'>SidebarMenu

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
              <div className='Alarms BottomBorder'></div>
              <div className='SensorValue BottomBorder'>{unit["flow"]}</div>
              
            {unit["sensors"].map((sensor) => {return(
              <>
                <div className='MenuItemName Sensor'
                  onClick={() => {window.location.pathname = unit["id"]+"/"+sensor["id"]}}
                  id={window.location.pathname === "/"+unit["id"]+"/"+sensor["id"] ? "Selected" : ""}
                  >{sensor["name"]}</div>
                <div className='Alarms'></div>
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
