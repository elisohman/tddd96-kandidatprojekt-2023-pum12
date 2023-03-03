// Importing modules
import React, { useState, useEffect, PureComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function App() {
	// usestate for setting a javascript
	// object for storing and using data

	// Data fetch for graph
	const [data, setData] = useState([{
		unit: 0,
		flow: 0,
		airpressure: 0,
		temp: 0
	}]);

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/data").then(
      res => res.json()
    ).then(
      data => {
				// Setting a data from api
				setData([{name: "unit", num: data.unit},
				{name: "flow", num: data.flow},
				{name: "airpressure", num: data.airpressure},
				{name: "temp", num: data.temp}])
        		console.log(data)
			}
    )
	}, [])

	// -------------------------------------------
	// Second data fetch for text
	const [ts_data, set_ts] = useState({
		timestamp: ""
	});

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/data").then(
      res => res.json()
    ).then(
      ts_data => {
				// Setting a data from api
				set_ts({name: "timestamp", num: ts_data.timestamp})
        		console.log(ts_data)
			}
    )
	}, [])

  return (
    <div className="App">
		<header className="App-header">
			<h1>Testdata</h1>
			<p>{ts_data.name}: {ts_data.num}</p>
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

