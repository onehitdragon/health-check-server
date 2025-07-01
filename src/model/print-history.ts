import { getDB } from "../database/DB"

type PrintHistory = {
    id: number,
    print_at: string,
    employee_mst: string
}

async function getPrintHistories(){
    const db = getDB();
    const query = db.prepare(
        "SELECT * FROM print_history"
    );
    return query.all() as PrintHistory[];
}

export { getPrintHistories };