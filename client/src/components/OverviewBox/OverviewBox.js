import React from 'react'
import './OverviewBox.css'

export default function SidebarHeader(props) {
  return ( 
    <div className="OverviewBoxContainer">
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Small beer (20cl)</div>
            <div className='InfoBoxValue'>439192 cans</div>
        </div>
        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Large beer (50cl)</div>
            <div className='InfoBoxValue'>214123 cans</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Average time to empty barrel</div>
            <div className='InfoBoxValue'>5.1 days</div>
        </div>        <div className='InfoBox'> 
            <div className='InfoBoxTitle'>Unopened barrels</div>
            <div className='InfoBoxValue'>6327 barrels</div>
        </div>        
    </div>
  )
}

