# Om ni vill skapa eget service account: 
https://cloud.google.com/bigquery/docs/reference/libraries

Om ni vill använda det service account jag skapade:
Gå in i Google Cloud
Gå in i IAM & Admin
Välj Service Accounts till vänster 
Klicka på philiptestar@internet-of-kegs.iam.gserviceaccount.com
Klicka på Keys 
Klicka Add Key -> Create New Key 
Då kommer ni ladda ner en .JSON fil, den ska in i >>PATH TILL DIN JSON<< i python-filen

# Start app
Backend: In folder "/server" run "python server.py"
frontend: In folder "/client" run "npm start"

The app autorefreshes when a new change is saved

# ModuleNotFoundError: No module named 'google'
Installera BigQuery Client library:
pip install --upgrade google-cloud-bigquery

# Requirements
Server:
Install flask

Client:
npm install
npm install recharts