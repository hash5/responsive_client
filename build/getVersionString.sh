#/bin/bash

revcount=`git rev-list HEAD --count`
sha=`git rev-parse --short HEAD`
versionnum=`echo "scale=2; ${revcount}/100" | bc`

echo "Version $versionnum (sha ${sha})";
