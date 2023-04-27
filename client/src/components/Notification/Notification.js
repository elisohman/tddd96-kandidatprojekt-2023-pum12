import React, { useState} from "react";
import "./Notification.css";

function Notification(props){
    let state = "";
    if (props.read) {
        state = "oldAlarm";
    }
    else {
        state = "newAlarm"
    }
    const [notificationState, setNotificationState] = useState(state);

    function changeState(){
        if(notificationState === "newAlarm"){
            setNotificationState("oldAlarm");
            return;
        }

        setNotificationState("newAlarm");
    }

    return(
        <div className={notificationState} id="component" onClick={() => {changeState()}}>
            <p id = "alarmType">{props.location + " -> [Unit " + props.unit + "] " + props.alarm}</p>
            <p id = "alarmDate">{props.timestamp}</p>
        </div>
    );

}


export default Notification;