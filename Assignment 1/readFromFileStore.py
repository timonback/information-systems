#!/usr/bin/python3

import os
import json
import timeit
import random

filestoredir = './datastore'

image_amount = 40
xy_coord = random.randint(0, 274999)

print('reading {}'.format(image_amount))

images = []

start_time = timeit.default_timer()
# code you want to evaluate
for image_index in range(0, image_amount):
    file_image_src = '{path}/{index}.blob'.format(path=filestoredir, index=image_index)

    with open(file_image_src) as json_data:
        d = json.load(json_data)

    images.append(d)

elapsed = timeit.default_timer() - start_time
print(elapsed)

print('read time elapsed {}'.format(elapsed))

##################################################################
trend = []

start_time = timeit.default_timer()
# code you want to evaluate
for image_index in range(0, image_amount):
    file_obj_src = '{path}/{index}.json'.format(path=filestoredir, index=image_index)

    with open(file_obj_src) as json_data:
        d = json.load(json_data)

    trend.append(d[xy_coord])

elapsed = timeit.default_timer() - start_time

print('read time elapsed {}'.format(elapsed))