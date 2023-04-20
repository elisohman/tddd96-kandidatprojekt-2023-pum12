from flask import Blueprint
from services.map_service import get_world_map_color_service, get_district_color_service

map_route = Blueprint('map_route', __name__)


@map_route.route("/map_data", methods=['GET'])
def get_world_map_color():
    return get_world_map_color_service()


@map_route.route("/map_data/<name>", methods=['GET'])
def get_district_color(name):
    return get_district_color_service(name)