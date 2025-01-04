const Auth = require("../models/Auth");
const Employee = require("../models/Employee");

// ฟังก์ชันสำหรับการลงทะเบียน
exports.register = async (req, res) => {
  const { username, password, name, email, department, position } = req.body;
  try {
    const userExists = await Auth.findByUsername(username);
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // เพิ่มผู้ใช้ในตาราง users
    const userId = await Auth.register({ username, password });

    // เพิ่มข้อมูลพนักงานในตาราง employee โดยเชื่อมโยงกับ UserID
    await Employee.create({
      Name: name,
      Email: email,
      Department: department,
      Position: position,
      UserID: userId,
    });

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => { 
    const { username, password } = req.body;
    console.log(req.body)
    try {
      const user = await Auth.findByUsername(username);
     
  
      if (user && user.password === password) {
        // ดึงข้อมูล employee ที่เกี่ยวข้องกับ user
        const employee = await Employee.findById(user.id); 
        if (employee) {
          // บันทึก role ไว้ใน session
          req.session = { role: employee.Role };
  
          res.status(200).json({
            message: "Login successful",
            id: user.id,
            role: employee.Role,
            employee_id: employee.id,
            name: employee.Name,
            email: employee.Email,
            department: employee.Department,
            position: employee.Position,
          });
        } else {
          res.status(404).json({ message: "Employee details not found" });
        }
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  };
  