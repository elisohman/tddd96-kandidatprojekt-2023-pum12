import json
from os import walk


# wanted_map is either the ISO for a supportet map
# or "all" if all supported maps' layers are wanted
def create_layers_file(wanted_keys, wanted_map):
    output_file_name = ("all_layers"
                        if wanted_map == "all"
                        else f'{wanted_map}_layers')
    output_file = open(f'{output_file_name}.json', 'w')

    if wanted_map != "all":
        map_file = open(f'../../client/public/maps/{wanted_map}.json')
        data = json.load(map_file)
        res = get_layers(data, wanted_keys)
        map_file.close
    else:
        filenames = (next(walk('../../client/public/maps/'),
                          (None, None, []))[2])  # [] if no file
        res = []
        for file_name in filenames:

            if file_name == "world.json":
                continue

            map_file = open(f'../../client/public/maps/{file_name}')
            data = json.load(map_file)
            res.extend(get_layers(data, wanted_keys))

            map_file.close

    json.dump(res, output_file, indent=4)
    output_file.close()


# retireves allt the wanted keys and changes the key names
# as defined in the wanted_keys dict
def get_layers(file_dict, wanted_keys):
    result = []
    stack = [file_dict]

    while stack:
        current = stack.pop()
        if isinstance(current, dict):
            for k, v in current.items():
                if k == "properties":
                    result.append(get_wanted_keys(wanted_keys, v.items()))
                elif isinstance(v, dict) or isinstance(v, list):
                    stack.append(v)
        elif isinstance(current, list):
            for v in current:
                if isinstance(v, dict) or isinstance(v, list):
                    stack.append(v)

    return list(result)


# helper function for retrieving the wanted keys
def get_wanted_keys(wanted_keys, pairs):
    new_dict = {}
    for k, v in pairs:
        for k_wanted, v_wanted in wanted_keys.items():
            if k == k_wanted:
                new_dict[v_wanted] = v

    return new_dict


if __name__ == "__main__":
    wanted_keys = {
        "ISO": "iso",
        "NAME_0": "country",
        "NAME_1": "layer_1",
        "NAME_2": "layer_2"
        }
    # create_layers_file(wanted_keys, "ESP")
    # create_layers_file(wanted_keys, "DEU")
    create_layers_file(wanted_keys, "all")
