#!/usr/bin/python3

import os
import json
import timeit
import time
from shutil import copyfile

datadir = './data'
filestoredir = './datastore'

image_amount = 40

if not os.path.isdir(filestoredir):
    os.mkdir(filestoredir)


start_time = timeit.default_timer()
# code you want to evaluate
for image_index in range(0, image_amount):
    file_image_src = '{path}/{index}.blob'.format(path=datadir, index=image_index)
    file_image_dst = '{path}/{index}_{time}.blob'.format(path=filestoredir,
                                                       index=image_index,
                                                        time=time.time())
    copyfile(file_image_src, file_image_dst)

    file_obj_src = '{path}/{index}.json'.format(path=datadir, index=image_index)
    file_obj_dst = '{path}/{index}_{time}.json'.format(path=filestoredir,
                                                     index=image_index,
                                                      time=time.time())
    copyfile(file_obj_src, file_obj_dst)

elapsed = timeit.default_timer() - start_time
print(elapsed)

