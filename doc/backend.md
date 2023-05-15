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
│   └── map
│   └── volume
├── services
│   └── map_service
│   └── volume_service
├── utils
│   └── map_layers
│   └── sample_data  (for testing)
├── server.py
├── service-account-key.json
```

## Big query
Big query mainly uses services. This means that insted of sending a SQL query creted by the client (in this case the backend), the SQL query is already created in the cloud. The backend therfore only specifies the name of the query to execute. The credentials to access the big query account is in the file service-account-key.json.

## Map
When user clickes on a country, the frontend request the district map data for said country. This is sent as a JSON to frontend. The `/server/utils/sample_data` is used for testing the map-region-coloring without involving the cloud.