"""Volume API Routes / Endpoints

This file contains all the routes related to volume data.
"""

from flask import Blueprint, request
from services.volume_service import (get_series_service,
                                     get_total_service)


volume_route = Blueprint('volume_route', __name__)


@volume_route.route("/volume/series", methods=['GET'])
def get_series_for_world_view():
    time_range = request.args.get('time_range')
    return get_series_service(time_range)


@volume_route.route("/volume/series/<country>", methods=['GET'])
def get_series_for_country_view(country):
    time_range = request.args.get('time_range')
    return get_series_service(time_range, f'"{country}"')


@volume_route.route("/volume/total", methods=['GET'])
def get_total_for_world_view():
    time_range = request.args.get('time_range')
    return get_total_service(time_range)


@volume_route.route("/volume/total/<country>", methods=['GET'])
def get_total_for_country_view(country):
    time_range = request.args.get('time_range')
    return get_total_service(time_range, f'"{country}"')
