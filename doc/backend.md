# Backend documentation

## Overview

The backend has the following responsibilities:
1. Host the frontend website.
2. Send request to BigQuery.
2. Recieve requests from the frontend.

The backend is written in Python and using Flask. 

The structure of the backend is the following:
```
├── api
│   └── volume
├── services
│   └── volume_service
├── utils
│   └── sample_data             (for testing)
|   └── generate_sample_date    (for testing)
├── server.py
├── service-account-key.json
```

## BigQuery
BigQuery mainly uses services. This means that insted of sending a SQL query created by the client (in this case the backend), the SQL query is already created in the cloud. The backend therefore only specifies the name of the query to execute. The credentials to access the big query account is in the file service-account-key.json.

## Utils
The sample data in utils is map gradian coloring data. This is not currently in use. It can however be used for testing the map without using the cloud.

### Information about the frontend can be found [here](./frontend.md)
