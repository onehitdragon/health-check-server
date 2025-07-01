import fs from "fs/promises"
import path from "path";
import xlsx from "xlsx";

async function start(){
    const data = await fs.readFile(path.join(__dirname, "example.xlsx"));
    const book = xlsx.read(data);
    const sheet = book.Sheets[book.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(
        sheet,
        { header: ["mst","fullname","gender","birthday","cccd","cccdDate","cccdAt","phone","address","work","workPlace"] }
    );
    console.log(json[1]);
}

start();
