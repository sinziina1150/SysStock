const pool = require("../config/database");

class Auth {
  static async register({ username, password }) {
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    return result.insertId; // คืนค่า UserID
  }

  static async findByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  static async findById(UserID) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      UserID,
    ]);
    return rows[0]; // ส่งกลับเฉพาะแถวแรกของผลลัพธ์ (หากเจอข้อมูล)
  }

  static async update(UserID, { username, password }) {
    const [result] = await pool.query(
      "UPDATE users SET username = ?, password = ? WHERE id = ?",
      [username, password, UserID]
    );
    return result.affectedRows; // ส่งกลับจำนวนแถวที่ถูกอัปเดต
  }

  // เพิ่มเมธอด delete เพื่อทำการลบผู้ใช้งาน
  static async delete(UserID) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      UserID,
    ]);
    return result.affectedRows; // ส่งกลับจำนวนแถวที่ถูกลบ
  }
}

module.exports = Auth;
