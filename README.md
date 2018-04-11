# SHIOT
Secure Hash Internet Of Things Device

http POST :3000/api/signup username=pi password=raspberry admin=true
http GET :3000/api/signin --auth pi:raspberry

# Notes
 Does it make sense to run password check in the sign in and provide the token then.
 req.header does not have authorization property for bearer auth