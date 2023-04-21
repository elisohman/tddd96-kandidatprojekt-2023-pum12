import React from 'react'
import './AlarmHeader.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function AlarmHeader(props) {

  return ( 
    <div className="AlarmHeaderContent">
      <p className="AlarmHeader">{props.location}</p>
      


        <div className='backButton' onClick={() => {console.log("back button")}}>
        <KeyboardBackspaceIcon className='Icon' />
        <p className='Back'>Back</p>
        </div>
        
      {/* <div className="BackButton" onClick={() => {console.log("back button")}}> 
          
          <KeyboardBackspaceIcon className='Buttons' />
      </div>

      <div className="BackLabel" onClick={() => {console.log("back button")}}> 
          
          <p>Back</p>
      </div> */}

    </div>
  )
}

