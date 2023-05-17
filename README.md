# Internet of Kegs
React + Flask app

## Table of Contents

- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Documentation](#documentation)

## Getting started 🚀
1. Clone repo.
2. Make sure `Python3`, `Node.js` and `npm` are installed.
3. In `/server` run `pip install flask`
4. In `/server` run `pip install --upgrade google-cloud-bigquery`
5. In `/server` run `python3 server.py` to start backend.
6. In `/client` run `npm install` to install dependencies in frontend. It's normal to see some warnings.
7. In a new terminal go to `/client` and run `npm start` to start the frontend.
8. In your browser go to `localhost:3000` to see the website.

## Project Structure 📁
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
More information on [frontend](/doc/frontend.md)
and more information on [backend](/doc/backend.md).