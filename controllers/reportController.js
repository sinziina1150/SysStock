const Report = require("../models/Report");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const path = require("path");

exports.generateReport = async (req, res) => {
  const { startdate, enddate } = req.body;
  try {
    // ดึงข้อมูลรายงานจากฐานข้อมูล
    const reportData = await Report.generate({ startdate, enddate }); // สมมติว่าคุณดึงข้อมูลในรูปแบบ array

    const doc = new PDFDocument();
    const fileName = "output.pdf"; // กำหนดชื่อไฟล์
    const filePath = path.join(__dirname, "..", "uploads", fileName); // กำหนดที่เก็บไฟล์

    doc.pipe(fs.createWriteStream(filePath));
    doc.font("./Font/THSarabunNew.ttf");

    doc
      .image("logo.jpg", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("ระบบจัดการทรัพย์สินมหาวิทยาลัยเซาธ์อีสท์บางกอก", 110, 57)
      .fontSize(10)

    const startX = 50;
    const startY = 120;

    doc.moveDown();

    const table = {
      headers: [
        { label: "ผู้แจ้ง", property: "name", width: 100, align: "center" },
        { label: "แผนก", property: "Department", width: 80, align: "center" },
        { label: "แผนก", property: "device", width: 80, align: "center" },
        { label: "รายละเอียด", property: "date", width: 180, align: "left" ,headerAlign:"center"},
        {
          label: "วันที่แจ้ง",
          property: "description",
          width: 100,
          align: "center",
        },
      ],
      rows: [],
    };

    for (var i = 0; i < reportData.length; i++) {
      table.rows.push([
        reportData[i].Name,
        reportData[i].Department,
        reportData[i].device,
        reportData[i].description,
        reportData[i].date,
      ]);
    }

    doc.table(table, {
      x: startX,
      y: startY,
      width: 600,
      prepareHeader: () => doc.font("./Font/THSarabunNew.ttf").fontSize(14),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        const { x, y, width, height } = rectCell;
        if (indexColumn === 0) {
          doc
            .lineWidth(0.5)
            .moveTo(x, y)
            .lineTo(x, y + height)
            .stroke();
        }

        doc
          .lineWidth(0.5)
          .moveTo(x + width, y)
          .lineTo(x + width, y + height)
          .stroke();

        doc.font("./Font/THSarabunNew.ttf").fontSize(10).fillColor("#292929");
      },
    });

    doc.end();

    // ส่งลิงก์สำหรับดาวน์โหลดไฟล์
    const fileUrl = `/uploads/${fileName}`; // ระบุ URL ของไฟล์ที่สามารถเข้าถึงได้

    res
      .status(200)
      .json({ message: "Report generated successfully", downloadUrl: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
