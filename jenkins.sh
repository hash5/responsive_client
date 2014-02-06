PATH=$PATH:/usr/local/bin
export PATH


#jshint
jshint ./asset/common/js --jslint-reporter > ./jshint.xml

# start hash5 server
node app.js --port 9080 --redis false &

# give node some time to start
sleep 5

#start tests
wget -nc -O tests/selenium-server.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar
xvfb-run java -jar ./tests/selenium-server.jar
java -jar ./tests/ClosureTester.jar -testsfile "asset/common/js/alltests.js" -testserver "http://localhost:8090/www/" -outputfile jsunit-result.xml

#stop the node app and clean up
killall node