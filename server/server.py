"""Server

This is the main file for the backend that initializes and
runs the backend server.
"""

from flask import Flask
from api.volume import volume_route
import datetime
from google.cloud import bigquery
import os


SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'service-account-key.json'

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
# volume_route is currently the only route in use
app.register_blueprint(volume_route)


# Route for seeing a single data point
# (used for testing an not currently in use)
# For all routes see server/api
@app.route("/data")
def get_data():
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


# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
