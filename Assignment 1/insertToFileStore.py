#!/usr/bin/python3

import os, sys, getopt
import json
import timeit
import time
from shutil import copyfile, rmtree

datadir = './data'
filestoredir = './datastore'

try:
    opts, args = getopt.getopt(sys.argv[1:], "n:")
except getopt.GetoptError:
    print('insertToFileStore.py -n <image_amount>')
    sys.exit(2)

for opt, arg in opts:
    if opt == '-n':
        image_amount = arg

if not os.path.isdir(filestoredir):
    os.mkdir(filestoredir)
else:
    rmtree(filestoredir)
    os.mkdir(filestoredir)
    
print('inserting {}'.format(image_amount))

start_time = timeit.default_timer()
# code you want to evaluate
for image_index in range(0, image_amount):
    file_image_src = '{path}/{index}.blob'.format(path=datadir, index=image_index)
    file_image_dst = '{path}/{index}.blob'.format(path=filestoredir, index=image_index)
    copyfile(file_image_src, file_image_dst)

    file_obj_src = '{path}/{index}.json'.format(path=datadir, index=image_index)
    file_obj_dst = '{path}/{index}.json'.format(path=filestoredir, index=image_index)
    copyfile(file_obj_src, file_obj_dst)

elapsed = timeit.default_timer() - start_time

print('insert time elapsed {}'.format(elapsed))

