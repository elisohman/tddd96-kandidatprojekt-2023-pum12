# Import flask and datetime module for showing date and time
from flask import Flask, json
from api.volume import volume_route
import datetime
from google.cloud import bigquery
import os

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service-account-key.json'

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
app.register_blueprint(volume_route)


# Route for seeing a single data point 
# (used for testing an not currently in use)
# For all routes see server/api
@app.route("/data")
def get_time():
    # Returning an api for showing in reactjs
    client = bigquery.Client()
    query_job = client.query(
        """
        SELECT *
        FROM `internet-of-kegs.Testing123.DummyData`
        LIMIT 5
        """
    )
    results = query_job.result()  # Waits for job to complete.
    return [dict(row) for row in results]


# Route for seeing sensors available
@app.route("/sensors")
def get_sensors():
    json_url = os.path.join(SITE_ROOT, "utils/sensors.json")
    data = json.load(open(json_url))
    return data


# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
