import express from "express";
import { addEmployee, addEmployees, deleteByMst, Employee, existEmployeeWithCccd, existEmployeeWithMst, existEmployeeWithPhone, getAllEmployee, getAllPageEmployee, savePrintHistory } from "../model/employee";
import { getPrintHistories } from "../model/print-history";

const router = express.Router();

router.post("/add", async (req, res) => {
    try{
        const employee: Employee = req.body;
        if(await existEmployeeWithMst(employee.mst)){
            res.status(400).json({
                mstErr: `Duplicate mst: ${employee.mst}`
            });
            return;
        }
        if(await existEmployeeWithCccd(employee.cccd)){
            res.status(400).json({
                cccdErr: `Duplicate cccd: ${employee.cccd}`
            });
            return;
        }
        if(await existEmployeeWithPhone(employee.phone)){
            res.status(400).json({
                phoneErr: `Duplicate phone: ${employee.phone}`
            });
            return;
        }
        await addEmployee(employee);
        res.status(200).json({
            employee
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.get("/getall", async (req, res) => {
    try{
        const employees = await getAllEmployee();
        res.status(200).json({
            employeesCount: employees.length,
            employees
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.get("/getallpage", async (req, res) => {
    try{
        const page = parseInt(req.query.page as string);
        const pageSize = parseInt(req.query.pageSize as string);
        const offset = (page - 1) * pageSize;
        const employees = await getAllPageEmployee(pageSize, offset);
        res.status(200).json({
            page,
            pageSize,
            offset,
            employeesCount: employees.length,
            employees
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.get("/existedmst", async (req, res) => {
    try{
        const mst = req.query.mst as string;
        const existed = await existEmployeeWithMst(mst);
        res.status(200).json({
            existed
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.get("/existedcccd", async (req, res) => {
    try{
        const cccd = req.query.cccd as string;
        const existed = await existEmployeeWithCccd(cccd);
        res.status(200).json({
            existed
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.get("/existedphone", async (req, res) => {
    try{
        const phone = req.query.phone as string;
        const existed = await existEmployeeWithPhone(phone);
        res.status(200).json({
            existed
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.post("/addall", async (req, res) => {
    try{
        const employees: Employee[] = req.body;
        await addEmployees(employees);
        res.status(200).json({
            added: employees.length
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.post("/saveprinthistory", async (req, res) => {
    try{
        const msts: Employee["mst"][] = req.body;
        await savePrintHistory(msts);
        res.status(200).json({
            saved: msts.length
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.delete("/", async (req, res) => {
    try{
        const mst = req.query.mst as Employee["mst"];
        await deleteByMst(mst);
        res.status(200).json({
            deleted: mst
        });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

router.get("/printhistory", async (req, res) => {
    try{
        const printHistories = await getPrintHistories();
        res.status(200).json({ printHistories });
    }
    catch(err){
        res.status(500).json({
            err: "Server internal error"
        });
        console.log(err);
    }
});

export { router as employeeRouter }