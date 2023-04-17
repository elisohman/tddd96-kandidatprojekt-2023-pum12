# Import flask and datetime module for showing date and time
from flask import Flask, json, jsonify
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
        LIMIT 10
        """
    )
    results = query_job.result()  # Waits for job to complete.
    temp = []
    for row in query_job:
        temp = [dict(row) for row in query_job]
    
    return temp

# Running app
if __name__ == '__main__':
    app.run(debug=True)

