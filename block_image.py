import random
import socket
import sys
import time

from PIL import Image

if len(sys.argv) > 1:
    img = Image.open(sys.argv[1])
else:
    img = Image.open('./doge.jpg')
img_data = img.load()

width, height = img.size
UDP_IP = "127.0.0.1"
UDP_PORT = 6666


def valid_pixel(coords):
    x, y = coords
    return x >= 0 and x < 100 and y >= 0 and y < 100


def gen_surrounding(x, y):
    width = 2
    pixels = [(x - xd, y - yd)
              for xd in range(-width, width) for yd in range(-width, width)]
    pixels = filter(valid_pixel, pixels)
    return pixels


sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
while (True):
    center_x, center_y = random.randint(0, 100), random.randint(0, 100)
    pixels_to_render = gen_surrounding(center_x, center_y)
    for i, j in pixels_to_render:
        val = list(img_data[i, j])
        color = 'rgb(%d,%d,%d)' % (val[0], val[1], val[2])
        print color
        message = '%s %s %s' % (i, j, color)
        try:
            sock.sendto(message, ('192.168.1.150', 6666))
        except Exception:
            print "NO CONNECTION"
    time.sleep(.5)
