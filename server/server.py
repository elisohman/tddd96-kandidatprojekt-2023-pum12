# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
from google.cloud import bigquery
import os

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service-account-key.json'

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
@app.route("/data")
def get_time():
    # Returning an api for showing in reactjs
    client = bigquery.Client()
    query_job = client.query(
        """
        SELECT * 
        FROM `internet-of-kegs.Testing123.DummyData`
        LIMIT 1
        """
    )
    results = query_job.result()  # Waits for job to complete.
    count  = 0
    temp = {}
    for row in results:
        temp = {
            "timestamp": row.timestamp,
            "unit": row.unit,
			"flow": row.flow,
			"airpressure": row.airpressure,
            "temp": row.temp
        }
        count += 1
    
    return temp

# Running app
if __name__ == '__main__':
    app.run(debug=True)

