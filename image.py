import socket
import sys
import time

from PIL import Image

img = Image.open(sys.argv[1])
img_data = img.load()

width, height = img.size
UDP_IP = "127.0.0.1"
UDP_PORT = 6666

for i in range(width):
    for j in range(height):
        val = list(img_data[i, j])
        color = 'rgb(%s, %s, %s)' % val
        message = '%s %s %s' % (i, j, color)

        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.sendto(message, ('192.168.1.150', 6666))
        time.sleep(.01)
