import express from "express";
import { employeeRouter } from "./router/employee-router";
import cors from "cors"
import { createDB, removeDBIfExist, insertDB } from "./database/createDB";
import { existEmployeeWithCccd, existEmployeeWithMst, existEmployeeWithPhone, getAllEmployee } from "./model/employee";
import path from "path";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("dist"));

app.use("/api", express.static("public"));
app.get("/api/test", (req, res) => { res.status(200).json({ status: "server running..." }); })
app.use("/api/employee", employeeRouter);

app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
});

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

            // console.log(await getAllEmployee(1000, 100));
        });
    }
    catch(err){
        console.log(err);
    }
}

startServer();
