import React from 'react'
import './AlarmHeader.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function AlarmHeader(props) {

  return ( 
    <div className="AlarmHeaderContent">
      <p className="location">{props.location}</p>
      


        <div className='backButton' onClick={() => {props.setSidebarState(props.prevSidebarState)}}>
        <KeyboardBackspaceIcon className='Icon' />
        <p className='Back'>Back</p>
        </div>

    </div>
  )
}

