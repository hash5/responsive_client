#/bin/bash

CONFIG_FILE="config.json"

# insert version string into config.json:
VERS_NUMBER=`getVersionString.sh`
sed 's/"hash5.VERS_NUMBER": ".*"/"hash5.VERS_NUMBER": "'"$VERS_NUMBER"'"/' $CONFIG_FILE > genConfig.json

# start plovr compiler
java -jar plovr.jar build genConfig.json