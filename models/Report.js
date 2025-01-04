const pool = require("../config/database");

class Report {
  static async generate({ startdate, enddate }) {
    try {
      const query = `
      
      select em.Name,
          em.Department,
          DATE_FORMAT(req.date, '%Y-%m-%d') AS date,
          req.description ,
          e.name device
          from requests req 
          left join employee em on req.employeeId = employeeId
          left join equipment e on req.equipmentId = e.id 
          Where DATE_FORMAT(req.date, '%Y-%m-%d') BETWEEN ? and ?

          `;

      const [rows] = await pool.query(query, [startdate, enddate]);

      return rows;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Report;
