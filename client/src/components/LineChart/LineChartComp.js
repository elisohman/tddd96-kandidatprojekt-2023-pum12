import React from 'react';
import "./LineChartComp.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function LineChartComp(props) {
    return (
        <div className='ChartContainer'>
            <div className='Content'>

                <p className='ChartTitle'>{props.title}</p>
                <ResponsiveContainer width="95%" height={350}>
                        
                        <LineChart width={props.width} height={props.height} data={props.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={props.xkey} tick={false}/>
                            <YAxis dataKey={props.ykey}/>
                            <Tooltip />
                            <Line type="monotone" dataKey={props.ykey} fill="#8884d8" activeDot={false}/>
                            
                        </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LineChartComp;