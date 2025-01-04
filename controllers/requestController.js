const Request = require('../models/Request');

// แสดงรายการเบิกอุปกรณ์ทั้งหมด
exports.getAllRequests = async (req, res) => {
  try {
    console.log("Fetching all equipment requests...");
    const requests = await Request.findAll(); 

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching equipment requests:", error.message);
    res.status(500).json({ error: 'Failed to retrieve equipment requests' });
  }
};

// เพิ่มรายการเบิกอุปกรณ์
exports.addRequest = async (req, res) => {
  const { equipmentId, employeeId, qty, status, date ,description} = req.body;
  try {
    


      const id = await Request.create({ equipmentId, employeeId, qty, status, date,description });
       res.status(201).json({ message: 'Equipment request added successfully', id });

   
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
 

// ลบรายการเบิกอุปกรณ์
exports.deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await Request.delete(id);
    res.status(200).json({ message: 'Equipment request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment request' });
  }
};

// แก้ไขรายการเบิกอุปกรณ์
exports.updateRequest = async (req, res) => {
  const { id } = req.params;
  const { equipmentId, employeeId, qty, status, date } = req.body;
  try {


    console.log(req.body)
    const result =  await Request.Checkstock({equipmentId});
    
    if(status == "Denied") {
      const stock = result.qty
      await Request.update(id, { equipmentId, employeeId, qty, status, date,stock });
      res.status(200).json({ message: 'Request denied: Quantity exceeds available stock' });
    }

    if(status == "Pending") {
      const stock = result.qty
      await Request.update(id, { equipmentId, employeeId, qty, status, date,stock });
      res.status(200).json({ message: 'Equipment request updated Status Padding' });
    }
    
    if(status == "Approved") {
      const stock = result.qty - qty;
      if(qty > result.qty) {
        res.status(200).json({ message: 'Requested quantity exceeds available stock' });
      }else {
        await Request.update(id, { equipmentId, employeeId, qty, status, date,stock });
        res.status(200).json({ message: 'Equipment request updated successfully' });
      }
    }
    
   
    
    

  
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment request' });
  }
}; 

// ฟังก์ชันสำหรับอนุมัติหรือปฏิเสธคำขอ
exports.approveRequest = async (req, res) => {


  try {
    await Request.approve(requestId, approve);
    res.status(200).json({ message: `Request ${approve ? 'approved' : 'denied'} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update request status' });
  }
};