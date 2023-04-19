# Internet of Kegs

React + Flask app

## Table of Contents

- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Documentation](#documentation)

## Getting started

```
git clone https://gitlab.liu.se/tddd96-2023_pum12/tddd96-kandidatprojekt-2023-pum12.git

```

### Prerequisites

Python, Node.js

### Installation

Stå i Client mappen, sedan kör följande kommandon:

npm install

npm install react-simple-maps

npm install react-tooltip

### Developing

Stå i Client mappen, kör npm start

Öppna en ny terminal, ställ dig i server mappen, kör python3 server.py

## Start app

Backend: In folder "/server" run "python server.py"\
Frontend: In folder "/client" run "npm start"\

The app autorefreshes when a new change is saved

## Project structure

(nedan är endast ett template)

```
├── doc
├── config
├── src
│   └── client
│   └── server
├── tests
├── README.md
├── .gitignore
```

## Documentation

Se doc mappen.

## FAQ

### ModuleNotFoundError: No module named 'google'

Installera BigQuery Client library:
pip install --upgrade google-cloud-bigquery

# Icons

Example:
import HelpIcon from '@mui/icons-material/Help';
Link to website:
https://mui.com/material-ui/material-icons/ for icons
