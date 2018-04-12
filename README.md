# SHIOT
Secure Hash Internet Of Things Device

http POST :3000/api/signup username=pi password=raspberry admin=true
http GET :3000/api/signin --auth pi:raspberry

# Notes
 Does it make sense to run password check in the sign in and provide the token then.
 req.header does not have authorization property for bearer auth

 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZGQzNGNlNmNkMTg4M2M2NzEyYTg3MGFlNTQyMzlmNjliZjk2MWM1NWU2MTI3OWRjOGJkNDY5ZmIwN2I0MWUiLCJpYXQiOjE1MjM1MDM4Mzd9.rYLg0M2_dJK0CmoTO8Yt6aQF7dSb7I9dV4V9mrzV34I