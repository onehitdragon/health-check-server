import Database from "better-sqlite3";
import path from "path";
import fs from "fs/promises";
import { faker } from "@faker-js/faker";

async function removeDBIfExist(){
    try{
        await fs.unlink(path.join(__dirname, "mydb.sqlite"));
    }
    catch(err){}
}

async function createDB(){
    const db = new Database(path.join(__dirname, "mydb.sqlite"));
    const sql = (await fs.readFile(path.join(__dirname, "create.sql"))).toString();
    db.exec(sql);
    db.close();
}

async function insertDB(){
    const db = new Database(path.join(__dirname, "mydb.sqlite"));
    let insert = db.prepare(
        "INSERT INTO employee(mst, fullname, gender, birthday, cccd, cccdDate, cccdAt, phone, address, work, workPlace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    insert.run(
        'NV0',
        'Nguyễn Văn A',
        1,
        '1998-10-28',
        '215514332',
        '2020-9-25',
        'Lô 10A',
        '01665744112',
        'Phường 10B',
        'Cơ khí',
        'Công ty AC'
    );
    for(let i = 0; i < 100; i++){
        insert.run(
            `NV${i + 1}`,
            `Nguyễn ${faker.person.lastName()}`,
            `${faker.person.sex() == "male" ? 1 : 0}`,
            `${faker.date.birthdate({ min: 1980, max: 2003, mode: 'year' }).toISOString().slice(0, 10)}`,
            `${faker.string.numeric(9)}`,
            `${faker.date.past({ years: 10 }).toISOString().slice(0, 10)}`,
            `Đường ${faker.location.streetAddress()}`,
            `097${faker.string.numeric(7)}`,
            `Quận ${faker.location.city()}`,
            `${faker.helpers.arrayElement(['Cơ khí', 'Điện tử', 'Vận hành', 'Sản xuất'])}`,
            `Công ty ${faker.company.name()}`
        );
    }
    insert = db.prepare(
        "INSERT INTO print_history(employee_mst) VALUES(?)"
    );
    insert.run(
        'NV0'
    );
    insert.run(
        'NV1'
    );

    db.close();
}

export { removeDBIfExist, createDB, insertDB }
