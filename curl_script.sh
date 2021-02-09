#!/bin/sh
curl "http://localhost:3001/api/v1/login?email=teacher%2B3%40gmail.com&password=1234" -o "login.txt"
token1=$(cat login.txt | awk 'BEGIN { FS = ":" } ; {print $3}')
token=$(echo $token1 | awk 'BEGIN { FS = "\"" } ; {print $2}')
echo $token

curl  -X GET --data '{"token":"$token"}' http://localhost:3001/api/v1/courses