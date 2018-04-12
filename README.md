# SHIOT
Secure Hash Internet Of Things Device

http POST :3000/api/signup username=pi password=raspberry admin=true
http GET :3000/api/signin --auth pi:raspberry

# Notes
 Does it make sense to run password check in the sign in and provide the token then.
 req.header does not have authorization property for bearer auth

 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIwMTQxMTdkYzQ2ZGIyZDVjOGJlNjhiMmIyZWM2YTkzZGJlZWM2NmU5ZmIzMjYxOTUwMDc4ZTgyNmMyNTQwYzMiLCJpYXQiOjE1MjM1MDY4MzZ9.wy4wykxVydK37VpeiLUo2tQE_j0mKcKnqPS227iiE0M