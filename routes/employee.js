const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");

// แสดงข้อมูลผู้ใช้งานทั้งหมด
router.get("/users", EmployeeController.getAllEmployees);

// เพิ่มข้อมูลผู้ใช้งานใหม่
router.post("/users", EmployeeController.createEmployee);

// แก้ไขข้อมูลผู้ใช้งาน
router.put("/users/:id", EmployeeController.updateEmployee);

// ลบข้อมูลผู้ใช้งาน
router.delete("/users/:id", EmployeeController.deleteEmployee);

module.exports = router;
