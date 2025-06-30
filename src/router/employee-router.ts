import express from "express";

const router = express.Router();

router.get("/add", (req, res) => {
    res.send("good");
});

export { router as employeeRouter }