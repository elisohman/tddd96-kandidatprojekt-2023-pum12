
import json
import csv
import random

# Change to ISO3 for desired country
file_name = "VEN"

json_file = open(f'../../client/public/maps/{file_name}.json')
csv_file = open(f'sample_data/{file_name}.csv', 'w')

json_data = json.load(json_file)
csv_writer = csv.writer(csv_file)

header = ["name", "1d", "1w", "1m", "1y", "all"]
csv_writer.writerow(header)

# If you cannot generate, change adm2 for adm1
# and NAME_2 for NAME_1. Remember to change back!
for i in json_data["objects"][f"{file_name}_adm2"]["geometries"]:
    name = i["properties"]["NAME_2"]
    csv_writer.writerow([name,
                         random.uniform(0, 1),
                         random.uniform(0, 1),
                         random.uniform(0, 1),
                         random.uniform(0, 1),
                         random.uniform(0, 1)])

json_file.close()
csv_file.close()
