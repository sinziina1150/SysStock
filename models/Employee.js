const pool = require("../config/database");

class Employee {
  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM employee");
    return rows;
  }

  static async create({ Name, Email, Department, Position, Role, UserID }) {
    const [result] = await pool.query(
      "INSERT INTO employee (Name, Email, Department, Position, Role, UserID) VALUES (?, ?, ?, ?,?, ?)",
      [Name, Email, Department, Position, Role, UserID]
    );
    return result.insertId;
  }

  static async findById(UserID) {
    const [rows] = await pool.query("SELECT * FROM employee WHERE UserID = ?", [
      UserID,
    ]);
    return rows[0]; // ส่งกลับเฉพาะแถวแรกของผลลัพธ์ (หากเจอข้อมูล)
  }
  static async findOne({ UserID }) {
    const [rows] = await pool.query("SELECT * FROM employee WHERE UserID = ?", [
      UserID,
    ]);
    return rows[0]; // ส่งกลับเฉพาะแถวแรกของผลลัพธ์ (หากเจอข้อมูล)
  }
  // เพิ่มเมธอด update เพื่ออัปเดตข้อมูลพนักงาน
  static async update(id, { Name, Email, Department, Position, Role }) {
    const [result] = await pool.query(
      "UPDATE employee SET Name = ?, Email = ?, Department = ?, Position = ?, Role = ? WHERE id = ?",
      [Name, Email, Department, Position, Role, id]
    );
    return result.affectedRows; // ส่งกลับจำนวนแถวที่ถูกอัปเดต
  }

  // เพิ่มเมธอด delete เพื่อการลบข้อมูลพนักงาน (ถ้าต้องการ)
  static async delete(id) {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      id,
    ]);
    return result.affectedRows; // ส่งกลับจำนวนแถวที่ถูกลบ
  }
}

module.exports = Employee;
