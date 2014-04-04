PATH=$PATH:/usr/local/bin
export PATH


#jshint
# jshint ./asset/common/js --jslint-reporter > ./jshint.xml

base=`pwd`


# start closure compiler
# TODO


# pull hash5 server, set symlink and start server
SERVER_PATH="${base}/hash5"
if [ -d "$SERVER_PATH" ]; then
    cd $SERVER_PATH
    git fetch --all
    git reset --hard origin/master
    cd $base
else
    git clone git@dbis-git.uibk.ac.at:hash5/hash5.git $SERVER_PATH
fi
cd $SERVER_PATH/server/public
rm client
ln -s ../../../ client
cd "${SERVER_PATH}/server"
npm update > /dev/null
node app.js --port 9080 --redis false &
cd $base

#start tests
wget -nc -O $base/tests/selenium-server.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar
seleniumstart="xvfb-run java -jar $base/tests/selenium-server.jar"
${seleniumstart} &
sleep 30
java -jar $base/tests/ClosureTester.jar -testsfile "asset/common/js/alltests.js" -testserver "http://localhost:9080/client/" -outputfile jsunit-result.xml

#stop the node app and clean up
killall node

wget -O- "http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer" > /dev/null
