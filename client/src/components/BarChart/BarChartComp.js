import React from 'react';
import "./BarChartComp.css";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarChartComp(props) {
    return (
        <div className='ChartContainer'>
            <div className='Content'>
                
                <p className='ChartTitle'>Title of chart</p>
                <ResponsiveContainer width="95%" height={400}>
                        <BarChart width={300} height={300} data={props.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <Bar dataKey="num" fill="#8884d8" />
                        </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BarChartComp;