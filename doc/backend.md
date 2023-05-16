# Backend

## Overview

The backend have the following responsibilities:
1. Host the frontend website.
2. Send request to Big query.
2. Recieve requests from frontend.

The backend is written in Python and using Flask. 

The structure of the backend is following
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

## Big query
Big query mainly uses services. This means that insted of sending a SQL query creted by the client (in this case the backend), the SQL query is already created in the cloud. The backend therfore only specifies the name of the query to execute. The credentials to access the big query account is in the file service-account-key.json.

## Utils
The sample data in utils is map gradian coloring data. This is not currently in use. This can be used for testing the map without using the cloud.