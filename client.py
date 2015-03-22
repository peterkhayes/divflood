import random
import socket
import time
# import pillow

UDP_IP = "127.0.0.1"
UDP_PORT = 6666

while True:
    MESSAGE = "%s %s %s" % (
        random.randint(0, 99),
        random.randint(0, 99),
        random.choice(['rebeccapurple', 'black', 'blue', 'red', 'green'])
    )
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(MESSAGE, ('127.0.0.1', 6666))
    time.sleep(0.01)
