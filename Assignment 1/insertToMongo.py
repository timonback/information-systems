#!/usr/bin/python3

from pymongo import MongoClient
import os
import timeit
import json

datadir = './data'

image_amount = 400

# set up connection
client = MongoClient("mongodb://172.17.0.2:27017")
print(client.server_info())
exit()
db = client['lab1info']
coll = db['datastore']

start_time = timeit.default_timer()
# code you want to evaluate
for image_index in range(0, image_amount):
    file_image_src = '{path}/{index}.json'.format(path=datadir, index=image_index)
    with open(file_image_src) as json_data:
        d = json.load(json_data)

    result = coll.insert_one(d)

elapsed = timeit.default_timer() - start_time

