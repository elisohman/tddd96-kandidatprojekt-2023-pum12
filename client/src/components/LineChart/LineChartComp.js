import React, { useState, useEffect } from 'react';
import "./LineChartComp.css";
import TimespanButtons from "../../components/TimespanButtons/TimespanButtons"
import { getVolumeSeries } from '../../apis/VolumeAPI';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function LineChartComp(props) {
    // Data fetch for graph
	const [data, setData] = useState([]);
    const [date, setDate] = useState("1d");
    const [timestamp, setTimestamp] = useState("timestamp_hour");

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        const timestamps = ["timestamp_hour", "timestamp_day", "timestamp_day", "timestamp_month", "timestamp_month"];
        setDate(buttons[index]);
        setTimestamp(timestamps[index]);
    }

    // Using useEffect for single rendering
    useEffect(() => {
        getVolumeSeries(date).then( data => {
            setData(data);
        })
      }, [date]);


    return (
        <div className='ChartContainer'>
            <div className='Content'>

                <p className='ChartTitle'>{props.title}</p>
                <ResponsiveContainer width="95%" height={props.sidebarState === "largeSidebar" ? 200 : 200}>
                        
                        <LineChart width={props.width} height={props.height} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={timestamp} tick={false}/>
                            <YAxis dataKey="total_volume"/>
                            <Tooltip />
                            <Line type="monotone" dataKey="total_volume" fill="#8884d8" activeDot={false}/>
                            
                        </LineChart>
                </ResponsiveContainer>
                <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
            </div>
        </div>
    );
}

export default LineChartComp;