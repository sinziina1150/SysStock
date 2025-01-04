const pool = require('../config/database');

class Equipment {
  static async findAll() {
    const [rows] = await pool.query(`SELECT a.* , b.Name,b.Department,b.Position FROM equipment a left join employee b on a.EmployeeID = b.id`);
    return rows;
  }

  static async create({ name, qty, date,deviceid,description }) {
    const [result] = await pool.query(
      "INSERT INTO equipment (name, qty, date,deviceid) VALUES (?, ?, ?,?)",
      [name, qty, date,deviceid,description]
    );
    return result.insertId;
  }

  static async update(id, { name, qty, date,deviceid,description }) {
    const [result] = await pool.query(
      "UPDATE equipment SET name = ?, qty = ?, date = ?,deviceid = ?, description = ? WHERE id = ?", 
      [name, qty, date, id,deviceid,description]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM equipment WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = Equipment;
