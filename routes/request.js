const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllRequests);
router.post('/create', requestController.addRequest);
router.put('/:id', requestController.updateRequest); // สำหรับแก้ไขอุปกรณ์
router.delete('/:id', requestController.deleteRequest); // สำหรับลบอุปกรณ์
router.post('/approve', requestController.approveRequest);

module.exports = router;
