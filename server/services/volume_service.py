"""Volume Service

This file contains all the logic for the volume routes.

# BigQuery info:
Instead of calling bigquery with a query string, we can call a procedure.
This is a more secure way of calling bigquery.
The procidure is created in cloud.
"""

from google.cloud import bigquery
import os

# Used for BigQuery authentication
# Not secure handling of credentials, should be changed
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '../service-account-key.json'


def get_series_service(time_range, country="NULL"):
    """Retrieves a series of volume data for the world or a specified country
        in a given time_range.

    Args:
        time_range (str): specifies the time_range (all, 1d, 1w, 1m, 1y)
        country (str): specifies the country
            (default is "NULL", which equals the world)

    Returns:
        list: a list of dictionaries, where a dictinary represents a
            data point in the series, with the fields
            "timestamp" and "total_volume" (in liters).
    """

    query = f"""
        CALL `internet-of-kegs.Testing123.graphGetCountries{
        get_procedure_time_range(time_range)
        }Volume`({country});
        """

    results = get_bigquery_data(query)
    for row in results:
        # Measurement comes in milliliters, we want to display liters
        row['total_volume'] /= 1000

    return results


def get_total_service(time_range, country="NULL"):
    """Retrieves the total volume for each country in the world
        (when no country is specified) or for each district in a
        specified country, in a given time_range.

    Args:
        time_range (str): specifies the time_range (all, 1d, 1w, 1m, 1y)
        country (str): specifies the country
            (default is "NULL", which equals the world)

    Returns:
        dict: a dict with the fields:
            "max_volume" — the largest total_volume, for a location,
                in the time_range.
            "total_volume" — the sum of all locations total_volume.
            "volumes" — a list of dictionaries, one for each location,
                with the fields "location" and "total_volume".
    """

    query = f"""
        CALL `internet-of-kegs.Testing123.tableGetCountries{
        get_procedure_time_range(time_range)
        }Volume`({country});
        """

    results = get_bigquery_data(query)
    max = 0
    total_volume = 0
    key = "total_volume"
    for row in results:
        # Measurement comes in milliliters, we want to display liters
        row[key] = row[key]/1000

        # Calculate the total volume for this time_range
        total_volume += row[key]

        # Find out the largest volume
        if row[key] > max:
            max = row[key]

    resulting_dict = {
        "max_volume": max,
        "total_volume": total_volume,
        "volumes": results
    }
    # print(resulting_dict)
    return resulting_dict


# The function that does the actual call to bigquery
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
