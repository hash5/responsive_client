PATH=$PATH:/usr/local/bin
export PATH


#jshint
# jshint ./asset/common/js --jslint-reporter > ./jshint.xml

base=`pwd`

# pull hash5 server, set symlink and start server
SERVER_PATH="${base}/hash5"
if [ -d "$SERVER_PATH" ]; then
	cd $SERVER_PATH
	git pull
	cd ..
else
	git clone git@dbis-git.uibk.ac.at:hash5/hash5.git $SERVER_PATH
fi
cd $SERVER_PATH/server/public
rm client
ln -s ../../../ client
cd "${SERVER_PATH}/server"
npm update
node app.js --port 9080 --redis false &
cd $base

# give node some time to start
sleep 5

#start tests
wget -nc -O tests/selenium-server.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar
xvfb-run java -jar ./tests/selenium-server.jar
java -jar ./tests/ClosureTester.jar -testsfile "asset/common/js/alltests.js" -testserver "http://localhost:8090/client/" -outputfile jsunit-result.xml

#stop the node app and clean up
killall node