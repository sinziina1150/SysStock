// employeeController.js

const Employee = require("../models/Employee");
const User = require("../models/Auth");

// ดึงข้อมูลผู้ใช้งานทั้งหมดพร้อมข้อมูลในตาราง users
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const detailedEmployees = await Promise.all(
      employees.map(async (employee) => {
        const user = await User.findById(employee.UserID);
        return {
          ...employee,
          username: user.username,
          password: user.password,
        };
      })
    );
    res.status(200).json(detailedEmployees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve employees" });
  }
};

// เพิ่มข้อมูลผู้ใช้งานในตาราง Employee และ User พร้อมกัน
exports.createEmployee = async (req, res) => {
  const { Name, Email, Department, Position, Role, username, password } =
    req.body;

  try {
    // เพิ่มข้อมูลในตาราง users ก่อน
    const userId = await User.register({ username, password });

    // เพิ่มข้อมูลในตาราง employee โดยเชื่อมโยง UserID
    const employeeId = await Employee.create({
      Name,
      Email,
      Department,
      Position,
      Role,
      UserID: userId,
    });

    res
      .status(201)
      .json({ message: "Employee created successfully", employeeId, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create employee" });
  }
};

// อัปเดตข้อมูลผู้ใช้งานทั้งในตาราง Employee และ User
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, Department, Position, Role, username, password } =
    req.body;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await Employee.update(id, { Name, Email, Department, Position, Role });

    // อัปเดตข้อมูลในตาราง users ด้วยข้อมูลใหม่
    if (username || password) {
      await User.update(employee.UserID,{ username, password });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// ลบข้อมูลผู้ใช้งานจากทั้งสองตาราง
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ลบข้อมูลจากตาราง employee
    await Employee.delete(id);

    // ลบข้อมูลจากตาราง users ที่เกี่ยวข้อง
    await User.delete(employee.UserID);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};
