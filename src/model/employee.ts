import { getDB } from "../database/DB"

type Employee = {
    mst: string,
    fullname: string,
    gender: number,
    birthday: string,
    cccd: string,
    cccdDate: string,
    cccdAt: string,
    phone: string,
    address: string,
    work: string,
    workPlace: string,
    created_at: string,
    update_at: string
}

async function existEmployeeWithMst(mst: Employee["mst"]){
    const db = getDB();
    const query = db.prepare("SELECT mst FROM employee WHERE mst = ?");
    const result = query.get(mst);
    if(result) return true;
    return false;
}

async function existEmployeeWithCccd(cccd: Employee["cccd"]){
    const db = getDB();
    const query = db.prepare("SELECT mst FROM employee WHERE cccd = ?");
    const result = query.get(cccd);
    if(result) return true;
    return false;
}

async function existEmployeeWithPhone(phone: Employee["phone"]){
    const db = getDB();
    const query = db.prepare("SELECT mst FROM employee WHERE phone = ?");
    const result = query.get(phone);
    if(result) return true;
    return false;
}

async function addEmployee(ee: Employee){
    const db = getDB();
    const insert = db.prepare(
        "INSERT INTO employee(mst, fullname, gender, birthday, cccd, cccdDate, cccdAt, phone, address, work, workPlace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    insert.run(
        ee.mst,
        ee.fullname,
        ee.gender,
        ee.birthday,
        ee.cccd,
        ee.cccdDate,
        ee.cccdAt,
        ee.phone,
        ee.address,
        ee.work,
        ee.workPlace
    );
}

async function addEmployees(ees: Employee[]){
    const db = getDB();
    const insert = db.prepare(
        "INSERT INTO employee(mst, fullname, gender, birthday, cccd, cccdDate, cccdAt, phone, address, work, workPlace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    for(const ee of ees){
        insert.run(
            ee.mst,
            ee.fullname,
            ee.gender,
            ee.birthday,
            ee.cccd,
            ee.cccdDate,
            ee.cccdAt,
            ee.phone,
            ee.address,
            ee.work,
            ee.workPlace
        );
    }
}

async function getAllEmployee(){
    const db = getDB();
    const query = db.prepare(
        "SELECT * FROM employee"
    );
    return query.all() as Employee[];
}

async function getAllPageEmployee(pageSize: number, offset: number){
    const db = getDB();
    const query = db.prepare(
        "SELECT * FROM employee LIMIT ? OFFSET ?"
    );
    return query.all(pageSize, offset) as Employee[];
}

export { Employee }
export { addEmployee, existEmployeeWithMst, existEmployeeWithCccd, existEmployeeWithPhone,
    getAllEmployee, addEmployees, getAllPageEmployee
 };
