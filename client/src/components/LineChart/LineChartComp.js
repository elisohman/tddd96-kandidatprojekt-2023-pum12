import React, { useState, useEffect } from 'react';
import "./LineChartComp.css";
import TimespanButtons from "../../components/TimespanButtons/TimespanButtons"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function LineChartComp(props) {
    // Data fetch for graph
	const [data, setData] = useState([]);
    const [date, setDate] = useState("1d");
    const [title, setTitle] = useState(NaN);

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        setDate(buttons[index]);
    }
    
    const dataAPI = props.dataAPI;
    useEffect(() => {
        dataAPI(date).then( data => {
            setData(data);
            if (data.length == 0) setTitle(NaN);
            else setTitle(props.title);
        })
    }, [dataAPI, date]);

    return (
        <div className='ChartContainer'>
            <div className='Content'>

                <p className='ChartTitle'>{title}</p>
                <ResponsiveContainer width="95%" height={props.sidebarState === "largeSidebar" ? 200 : 200}>
                        
                        <LineChart width={props.width} height={props.height} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={props.xkey} tick={false}/>
                            <YAxis dataKey={props.ykey}/>
                            <Tooltip />
                            <Line type="monotone" isAnimationActive={false} dataKey={props.ykey} fill="#8884d8" activeDot={false}/>
                            
                        </LineChart>
                </ResponsiveContainer>
                <TimespanButtons parentFunction = {ButtonFunction} title = {["1 d", "1 w", "1 m", "1 y", "All"]}/>
            </div>
        </div>
    );
}

export default LineChartComp;