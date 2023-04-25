from google.cloud import bigquery
import os


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '../service-account-key.json'


def get_series_for_world_view_service(time_range):
    client = bigquery.Client()
    query_job = client.query(
        f"""
        CALL `internet-of-kegs.Testing123.graphGetCountries{
            get_procedure_time_range(time_range)
            }Volume`();
        """
    )
    results = query_job.result()  # Waits for job to complete.

    return [dict(row) for row in results]


def get_series_for_country_view_service(country, time_range):
    client = bigquery.Client()
    query_job = client.query(
        f"""
        CALL `internet-of-kegs.Testing123.GetCountry{
            get_procedure_time_range(time_range)
            }Volume`(\'{country}\');
        """
    )
    results = query_job.result()  # Waits for job to complete.

    return [dict(row) for row in results]


def get_total_for_world_view_service(time_range):
    procedure_time_range = "All"
    if time_range == "1d":
        procedure_time_range = "24hours"
    elif time_range == "1w":
        procedure_time_range = "1Week"
    elif time_range == "1m":
        procedure_time_range = "1Month"
    elif time_range == "1y":
        procedure_time_range = "1Year"

    client = bigquery.Client()
    query_job = client.query(
        f"""
        CALL `internet-of-kegs.Testing123.tableGetCountries{
            procedure_time_range
            }Volume`();
        """
    )
    results = query_job.result()  # Waits for job to complete.

    return [dict(row) for row in results]


def get_total_for_country_view_service(time_range, country):
    pass


def get_procedure_time_range(time_range):
    procedure_time_range = "All"
    if time_range == "1d":
        procedure_time_range = "24Hour"
    elif time_range == "1w":
        procedure_time_range = "1Week"
    elif time_range == "1m":
        procedure_time_range = "1Month"
    elif time_range == "1y":
        procedure_time_range = "1Year"
    return procedure_time_range
