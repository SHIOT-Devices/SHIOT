# SHIOT
Secure Hash Internet Of Things Device

http POST :3000/api/signup username=pi password=raspberry admin=true
http GET :3000/api/signin --auth pi:raspberry

# Notes
 Does it make sense to run password check in the sign in and provide the token then.
 req.header does not have authorization property for bearer auth

 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImVjNTEyZGYzNTkzNGQ5ZWY3ZjdjZTUyODQ3ZThiMTg0ZDhmYzUwNjRlOWZlMTc1NWE1Yzk2MGNlZTlhYjdkMmQiLCJpYXQiOjE1MjM0OTI1NDF9.jcN2x4sWeWM_2nR1NPwECO7_5XPAwS3YHas4kp9TMGI