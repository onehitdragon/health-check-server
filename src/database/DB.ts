import Database, { Database as DatabaseType } from "better-sqlite3";
import path from "path";

let db: DatabaseType | null = null;
function getDB(){
    if(!db){
        db = new Database(path.join(__dirname, "mydb.sqlite"));
    }
    return db;
}

export { getDB }