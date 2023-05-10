import React, { useState, useEffect } from 'react';
import "./LineChartComp.css";
import TimespanButtons from "../../components/TimespanButtons/TimespanButtons"
import { getVolumeSeries } from "../../apis/VolumeAPI.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function LineChartComp(props) {
    // Data fetch for graph
    const [buttonsAreDisabled, setButtonsAreDisabled] = useState(true);
	const [data, setData] = useState([]);
    const [date, setDate] = useState("1d");
    const [title, setTitle] = useState(NaN.toString()); 

    // Sets the specified timestan to active
    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        setDate(buttons[index]);
    }

    // Update the information every 60 seconds
    useEffect(() => {
        updateInformation();
        const interval = setInterval(() => {
            updateInformation();
        }, 60 * 1000);
    
        return () => clearInterval(interval);
    }, [props.location]);

    // Update all the timespans in buffer
    function updateInformation() {
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        buttons.forEach((button) => {
            if (props.location === "World") {
                getVolumeSeries(button);
            }
            else {
                getVolumeSeries(button, props.location);
            }
        })
    }

    // calls API with current selected date (timespan)
    useEffect(() => {
        getVolumeSeries(date, props.location).then( data => {
            setData(data);
            if (data.length === 0) setTitle(NaN.toString());
            else setTitle(props.title);
            setButtonsAreDisabled(false);
        })  
    }, [props.location, date]);

    return (
        <div className='ChartContainer'>
            <div className='Content'>

                <p className='ChartTitle'>{title}</p>
                <ResponsiveContainer width="95%" height={200}>
                        
                        <LineChart width={props.width} height={props.height} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={props.xkey} tick={false}/>
                            <YAxis dataKey={props.ykey}/>
                            <Tooltip />
                            <Line type="monotone" isAnimationActive={false} dataKey={props.ykey} fill="#8884d8" activeDot={false}/>
                            
                        </LineChart>
                </ResponsiveContainer>
                <TimespanButtons parentFunction = {ButtonFunction} isDisabled = {buttonsAreDisabled} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
            </div>
        </div>
    );
}

export default LineChartComp;