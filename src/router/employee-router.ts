import express from "express";
import { addEmployee, Employee, existEmployeeWithCccd, existEmployeeWithMst, existEmployeeWithPhone, getAllEmployee } from "../model/employee";

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
        const page = parseInt(req.query.page as string);
        const pageSize = parseInt(req.query.pageSize as string);
        const offset = (page - 1) * pageSize;
        const employees = await getAllEmployee(pageSize, offset);
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

export { router as employeeRouter }