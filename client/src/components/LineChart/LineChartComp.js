import React, { useState, useEffect } from 'react';
import "./LineChartComp.css";
import TimespanButtons from "../../components/TimespanButtons/TimespanButtons"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function LineChartComp(props) {
    // Data fetch for graph
	const [data, setData] = useState([]);
    const [date, setDate] = useState("1d");
    const [title, setTitle] = useState(NaN.toString());
    const [location, setLocation] = useState(props.location);
    const dataAPI = props.dataAPI;

    function ButtonFunction(index){
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        setDate(buttons[index]);
    }

    useEffect(() => {
        updateInformation();
        const interval = setInterval(() => {
            // Code to be executed every 60 seconds
            updateInformation();
        }, 60 * 1000);
    
        return () => clearInterval(interval);
    }, [location]);

    function updateInformation() {
        const buttons = ["1d", "1w", "1m", "1y", "all"];
        buttons.forEach((button) => {
            if (location === "World") {
                dataAPI(button);
            }
            else {
                dataAPI(button, location);
            }
        })
    }

    useEffect(() => {
        setLocation(props.location);
    }, [props.location]);

    useEffect(() => {
        if (location === "World") {
            dataAPI(date).then( data => {
                setData(data);
                if (data.length === 0) setTitle(NaN.toString());
                else setTitle(props.title);
            })
        }
        else {
            dataAPI(date, location).then( data => {
                setData(data);
                if (data.length === 0) setTitle(NaN.toString());
                else setTitle(props.title);
            })
        }
    }, [location, dataAPI, date]);

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