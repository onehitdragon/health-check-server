rm -rf buildexe && \
mkdir -p buildexe/node_modules && \
cp node_modules/better-sqlite3/build/Release/better_sqlite3.node buildexe/node_modules/ && \
cp src/database/create.sql buildexe/ && \
cp -r public/ buildexe/ && \
cp -r dist/ buildexe/ && \
esbuild src/index.ts --bundle --platform=node --outfile=buildexe/app.js && \
node --experimental-sea-config sea-config.json && \
rm buildexe/app.js && \
node -e "require('fs').copyFileSync(process.execPath, 'buildexe/server.exe')" && \
signtool remove -s buildexe/server.exe && \
postject buildexe/server.exe NODE_SEA_BLOB buildexe/sea-prep.blob \
--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 && \
rm buildexe/sea-prep.blob && \
tar -cvzf server.tar.gz -C buildexe . --transform='s|^\./||'

# const { isSea } = require("node:sea");
# if(isSea()){
#     const { createRequire } = require("node:module");
#     addon = DEFAULT_ADDON || (DEFAULT_ADDON = createRequire(__filename)('better_sqlite3.node'));
# }
# else{
#     addon = DEFAULT_ADDON || (DEFAULT_ADDON = require('bindings')('better_sqlite3.node'));
# }
