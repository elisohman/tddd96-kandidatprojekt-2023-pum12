import os

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))


def get_world_map_color_service():
    json_url = os.path.join(SITE_ROOT, "../utils/sample_data/test_map_data.csv")
    data = open(json_url)
    return data


def get_district_color_service(name):
    json_url = os.path.join(SITE_ROOT, f'../utils/sample_data/{name}.csv')
    data = open(json_url)
    return data