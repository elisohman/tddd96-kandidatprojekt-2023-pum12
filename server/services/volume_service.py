from google.cloud import bigquery
import os


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '../service-account-key.json'


def get_series_service(time_range, country="NULL"):
    query = f"""
        CALL `internet-of-kegs.Testing123.graphGetCountries{
        get_procedure_time_range(time_range)
        }Volume`({country});
        """

    results = get_bigquery_data(query)
    for row in results:
        row['total_volume'] /= 1000

    return results


def get_total_service(time_range, country="NULL", test=None):
    query = f"""
        CALL `internet-of-kegs.Testing123.tableGetCountries{
        get_procedure_time_range(time_range)
        }Volume`({country});
        """

    results = get_bigquery_data(query)
    max = 0
    key = get_volume_time_range(time_range)
    for row in results:
        if row[key] > max:
            max = row[key]

    resulting_dict = {
        "max_volume": max,
        "volumes": results
    }
    return resulting_dict


def get_bigquery_data(query):
    client = bigquery.Client()
    query_job = client.query(query)

    results = query_job.result()  # Waits for job to complete.

    return [dict(row) for row in results]


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


def get_volume_time_range(time_range):
    volume_time_range = "volume_all"
    if time_range == "1d":
        volume_time_range = "volume_24hours"
    elif time_range == "1w":
        volume_time_range = "volume_1week"
    elif time_range == "1m":
        volume_time_range = "volume_1month"
    elif time_range == "1y":
        volume_time_range = "volume_1year"
    return volume_time_range
