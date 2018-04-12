# SHIOT
Secure Hash Internet Of Things Device

http POST :3000/api/signup username=pi password=raspberry admin=true
http GET :3000/api/signin --auth pi:raspberry

# Notes
 Does it make sense to run password check in the sign in and provide the token then.
 req.header does not have authorization property for bearer auth

 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjU0YTczYmQwMjc3NTAyNmZkNTE3MDQxOWI0ZTIxZDQ0ZTU4MjllNTAwMmE3ZTVkYWI4MzM0Y2RiMzRhY2EzZjAiLCJpYXQiOjE1MjM1NTY1NzN9.NeatUutxIrMqdPq6bbr2stCuAnSR3Vw_5zSrn4DrJeg

 # RPi GPIO pinout
![alt text](./rp2_pinout.png)