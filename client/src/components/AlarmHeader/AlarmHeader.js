import React from 'react'
import './AlarmHeader.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function AlarmHeader(props) {

  return ( 
    <div className="AlarmHeaderContent">
      <p className="AlarmHeader">{props.location}</p>
      


      <div className="BackButton" onClick={() => {console.log("back button")}}> 
          {/* Image should only be shown if there is an alarm */}
          <KeyboardBackspaceIcon className='Buttons' />
      </div>
      <div className="BackLabel" onClick={() => {console.log("back button")}}> 
          {/* Image should only be shown if there is an alarm */}
          <p>Back</p>
      </div>
    </div>
  )
}

