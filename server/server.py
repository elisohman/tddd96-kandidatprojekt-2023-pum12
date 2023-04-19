# Import flask and datetime module for showing date and time
from flask import Flask, json
import datetime
from google.cloud import bigquery
import os

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
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
    temp = {}
    for row in results:
        temp = {
            "timestamp": row.timestamp,
            "unit": row.unit,
            "flow": row.flow,
            "airpressure": row.airpressure,
            "temp": row.temp
        }
    return temp


# Route for seeing sensors available
@app.route("/sensors")
def get_sensors():
    json_url = os.path.join(SITE_ROOT, "sensors.json")
    data = json.load(open(json_url))
    return data


@app.route("/map_data")
def get_map_data():
    json_url = os.path.join(SITE_ROOT, "sample_data/test_map_data.csv")
    data = open(json_url)
    return data


@app.route("/map_data/<name>")
def get_district_data(name):
    json_url = os.path.join(SITE_ROOT, f'sample_data/{name}.csv')
    data = open(json_url)
    return data


# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
