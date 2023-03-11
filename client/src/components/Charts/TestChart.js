import react from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart(props) {
    return (
        <section className="chart" >
		    <BarChart width={500} height={300} data={props.data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name"/>
				<YAxis />
      			<Bar dataKey="num" fill="#8884d8" />
    		</BarChart>
		</section>
    )
}