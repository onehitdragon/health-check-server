import express from "express";
import { employeeRouter } from "./router/employee-router";
import { createDB, removeDBIfExist, insertDB } from "./database/createDB";
import { existEmployeeWithCccd, existEmployeeWithMst, existEmployeeWithPhone, getAllEmployee } from "./model/employee";

const app = express();
app.use(express.json());

app.use("/employee", employeeRouter);

async function startServer(){
    try{
        // console.log("removing db...");
        // await removeDBIfExist(); // dev only

        console.log("creating db...");
        await createDB();

        // console.log("inserting db...");
        // await insertDB(); // dev only

        console.log("opening port...");
        app.listen(3000, async (err) => {
            if(err) throw err;
            console.log("server listening...");

            console.log(await getAllEmployee(1000, 100));
        });
    }
    catch(err){
        console.log(err);
    }
}

startServer();
