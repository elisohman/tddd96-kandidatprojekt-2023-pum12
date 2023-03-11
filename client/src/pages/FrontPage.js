import React, { useState, useEffect, PureComponent } from "react";
import Chart from "./../components/Charts/TestChart";

function FrontPage(props) {
    // Data fetch for graph
	const [data, setData] = useState([{
		unit: 0,
		flow: 0,
		airpressure: 0,
		temp: 0,
		timestamp: 0
	}]);

	// Using useEffect for single rendering
	useEffect(() => API_call("/data"), [])

	function API_call(request) {
		fetch(request)
			.then(res => res.json())
			.then(res => {
				// Setting a data from api
				// console.log(data);
				setData([
					{name: "unit", num: res.unit},
					{name: "flow", num: res.flow},
					{name: "airpressure", num: res.airpressure},
					{name: "temp", num: res.temp},
					{name: "timestamp", num: res.timestamp}
				])
				}
	)
	}
    return (
        <div>
            <h1>FrontPage</h1>
            <Chart data={data}/>
        </div>
    );
}

export default FrontPage;