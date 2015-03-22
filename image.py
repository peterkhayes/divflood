import socket
import sys
import time

from PIL import Image

img = Image.open(sys.argv[1])
img_data = img.load()

width, height = img.size
UDP_IP = "127.0.0.1"
UDP_PORT = 6666

while True:
    for i in range(height):
        for j in range(width):
            val = list(img_data[i, j])
            color = 'rgb(%d,%d,%d)' % (val[0], val[1], val[2])
            print color
            message = '%s %s %s' % (i, j, color)

            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock.sendto(message, (UDP_IP, UDP_PORT))
            time.sleep(.05)
