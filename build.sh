rm -rf buildexe && \
esbuild src/index.ts --bundle --platform=node --outfile=buildexe/app.js && \
cp src/database/create.sql buildexe/ && \
# mkdir buildexe/build/ && \
cp -r node_modules/better-sqlite3/build/Release/ build/ && \
node --experimental-sea-config sea-config.json && \
node -e "require('fs').copyFileSync(process.execPath, 'buildexe/server.exe')" && \
signtool remove -s buildexe/server.exe && \
postject buildexe/server.exe NODE_SEA_BLOB buildexe/sea-prep.blob \
--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
