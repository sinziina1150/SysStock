const pool = require("../config/database");

class Request {



  static async findAll() {
    console.log("findAll"); // เพิ่มเครื่องหมายคำพูดรอบข้อความ

    const query = `
          SELECT 
            requests.*, 
            equipment.name AS equipmentName, 
            employee.name AS employeeName,
            requests.description as description,
            equipment.deviceid as deviceid ,
            employee.Department as department
          FROM requests
          LEFT JOIN equipment ON requests.equipmentId = equipment.id
          LEFT JOIN employee ON requests.employeeId = employee.id
        `;

    const [rows] = await pool.query(query);
    return rows;
  }

  static async Checkstock({equipmentId}) {
    console.log(equipmentId)
    const [rows] = await pool.query('SELECT qty FROM equipment WHERE id = ?', [equipmentId]);
    return rows[0]
  }

  static async create({ equipmentId, employeeId, date, qty,description }) {
    console.log({ equipmentId, employeeId, date, qty,description })
        try {
     const [result] = await pool.query(
      `INSERT INTO requests (equipmentId, employeeId, date, qty, status,description) VALUES (${equipmentId}, ${employeeId}, '${date}', ${qty}, 'Create','${description}')`,);
    return result.insertId;
    } catch (error) {
        throw error
    }
    
  }

  static async UpdateStock ({stock,equipmentId}) {
    console.log({stock,equipmentId})
    await pool.query("UPDATE equipment SET qty = ? WHERE id = ?", [
      stock,
      equipmentId,
    ]);
  }

  static async approve(requestId, approve) {
    const status = approve ? "approved" : "denied";

   
    await pool.query("UPDATE requests SET status = ? WHERE id = ?", [
      status,
      requestId,
    ]);
  }

  // เพิ่มฟังก์ชันลบ
  static async delete(requestId) {
    await pool.query("DELETE FROM requests WHERE id = ?", [requestId]);
  }

  // ฟังก์ชันอัปเดตข้อมูล
  static async update(
    requestId,
    { equipmentId, employeeId, date, qty, status,stock }
  ) {
    try {
      // แปลงวันที่ให้เป็นรูปแบบที่ MySQL รองรับ
      const formattedDate = new Date(date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      
  
        const updateStock = await this.UpdateStock({stock,equipmentId})


      await pool.query(
        "UPDATE requests SET equipmentId = ?, employeeId = ?, date = ?, qty = ?, status = ?WHERE id = ?",
        [equipmentId, employeeId, formattedDate, qty, status, requestId]
      );

      console.log("Request updated successfully.");
    } catch (error) {
      console.error("Error updating request:", error.message);
      throw error;
    }
  }
}

module.exports = Request;
