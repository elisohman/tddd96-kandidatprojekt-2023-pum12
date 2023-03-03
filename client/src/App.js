// Importing modules
import React, { useState, useEffect, PureComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const graph_data = [
	{
	  name: 'Page A',
	  uv: 4000,
	  pv: 2400,
	  amt: 2400,
	},
	{
	  name: 'Page B',
	  uv: 3000,
	  pv: 1398,
	  amt: 2210,
	},
	{
	  name: 'Page C',
	  uv: 2000,
	  pv: 9800,
	  amt: 2290,
	},
  ];
  
function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setData] = useState({
		timestamp: "",
		unit: 0,
		flow: 0,
		airpressure: 0,
		temp: 0
		// this init isn't mandatory. can be empty {}
	});

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/data").then(
      res => res.json()
    ).then(
      data => {
				// Setting a data from api
				setData([
					{name: "unit", num: data.unit},
				{name: "flow", num: data.flow},
				{name: "airpressure", num: data.airpressure},
				{name: "temp", num: data.temp}])
        console.log(data)
			}
    )
	}, [])

  return (
    <div className="App">
		<header className="App-header">
			<h1>Testdata</h1>
			<p>{data[0].name}: {data[0].num}</p>
			<p>{data[1].name}: {data[1].num}</p>
			<p>{data[2].name}: {data[2].num}</p>
			<p>{data[3].name}: {data[3].num}</p>
		</header>
		<section className="chart" >
		    	<BarChart width={500} height={300} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name"/>
			<YAxis />
      		<Bar dataKey="num" fill="#8884d8" />
    	</BarChart>
		</section>
    </div>
  )
}
export default App;

