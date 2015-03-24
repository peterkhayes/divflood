import random
import time
import socket
import string

UDP_IP = "127.0.0.1"
UDP_PORT = 6666

while True:
    MESSAGE = "%s %s %s" % (
        random.randint(0, 500),
        random.randint(0, 500),
        "#" + "".join(random.choice("0123456789abcdef") for x in range(6))
    )
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
    time.sleep(.001)
