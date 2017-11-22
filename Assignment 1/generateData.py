#!/usr/bin/python3

import os
import json
import random

# Generate buienradar data
# Each image consisting of 550*500 data points (1 bit pixels) represents the rain on a
# single timestamp
# We will use 400 images in total. With 10.000.000 at sparsity of 10% is reached
# Each image represent the rain of one hour
# The data is completely random and following images have no connection

image_amount = 400
image_x = 500
image_y = 550
point_prob = 0.1
point_max = 10000000

datadir = './data'
if not os.path.isdir(datadir):
    os.mkdir(datadir)

random.seed(0)

point_counter = 0
for image_index in range(0, image_amount):
    print('Generate image {}'.format(image_index))
    image = []

    for y in range(0, image_y):
        for x in range(0, image_x):
            value = '0'
            if point_counter < point_max and 0.1 > random.random():
                value = '1'
                point_counter = point_counter + 1

            image.append(value)

    file_image_name = '{path}/{index}.blob'.format(path=datadir, index=image_index)
    file_image_obj_name = '{path}/{index}.json'.format(path=datadir, index=image_index)

    with open(file_image_name, 'w') as file:
        file.write(','.join(image))

    with open(file_image_obj_name, 'w') as file:
        json_data = {}
        for i in range(0, len(image)):
            json_data[str(i)] = image[i]
        json.dump({image_index: json_data}, file)



