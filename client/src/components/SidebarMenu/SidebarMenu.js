import React from 'react'
import './SidebarMenu.css'

export default function SidebarMenu(props) {

  return (
    <div>SidebarMenu
      <div className='SidebarMenuContainer'>
        <div className='HeaderSensors'>Sensors</div>
        {/* <div className='HeaderAlarms'>Alarms</div> */}
        <div className='HeaderFlow'>Flow</div>
        {
          props.data["units"].map((unit) => {return(
            <>
              <div className='MenuItemName Unit BottomBorder'>{unit["name"]}</div>
              <div className='Alarms BottomBorder'></div>
              <div className='SensorValue BottomBorder'>{unit["flow"]}</div>
              
            {unit["sensors"].map((sensor) => {return(
              <>
                <div className='MenuItemName Sensor'>{sensor["name"]}</div>
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
