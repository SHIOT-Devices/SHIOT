# SHIOT
Secure Hash Internet Of Things Device

http POST :3000/api/signup username=pi password=raspberry admin=true
http GET :3000/api/signin --auth pi:raspberry

# Download and write pi64 image to SD card
https://github.com/bamarni/pi64/releases
I recommend using the lite version since it is headless and less resource intensive, but if you get the desktop version you will get a GUI if you find it necessarry.

After un compressing the file use Etcher to write the image to the SD card.
https://etcher.io/

# pi64 install workpath
```
sudo apt-get update
sudo apt-get install nano
sudo apt-get install git
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install mongodb
sudo apt-get install make
sudo npm install -g node-gyp
sudo apt-get install build-essential

sudo groupadd gpio
sudo chown -R root:gpio /sys/class/gpio
sudo adduser root gpio
sudo adduser pi gpio
```

# RPi GPIO pinout
![alt text](./rp2_pinout.png)

in this example the LED is connected to pin 12/GPIO18 and the button is connected to pin 7/GPIO4.  I also reccomend using both ground pins 6 and 9.

# Clone SHIoT repo
```
git clone https://github.com/SHIOT-Devices/SHIOT.git
cd SHIOT
npm install
sudo node index.js
```