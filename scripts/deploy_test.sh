#!/bin/sh

cd ..
pwd
pnpm i
pnpm build
pnpm created

distName="dist-ssr.zip"

cd .output
rm -rf $distName
zip -r $distName ./*

sshTarget="root@8.218.221.95"

serverPath="/data/wwwlemon8-web-ssr/dist-ssr"
unzipPath="/data/wwwlemon8-web-ssr/dist"
ssh $sshTarget "mkdir -p $serverPath;mkdir -p $unzipPath;rm -rf $unzipPath/*;mv $serverPath/$distName $serverPath/${distName}.bk"
scp $distName $sshTarget:$serverPath
ssh $sshTarget "cd $unzipPath;unzip -o $serverPath/$distName;cd server;lsof -iTCP:3000 | awk '{print $2}' | tail -n 1 | xargs kill;bash /data/wwwlemon8-web-ssr/monitor-lemon8-ssr.sh"
