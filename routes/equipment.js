const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.get('/', equipmentController.getAllEquipments);
router.post('/create', equipmentController.addEquipment);
router.put('/:id', equipmentController.updateEquipment); // สำหรับแก้ไขอุปกรณ์
router.delete('/:id', equipmentController.deleteEquipment); // สำหรับลบอุปกรณ์

module.exports = router;
