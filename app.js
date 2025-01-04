const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const equipmentRoutes = require('./routes/equipment');
const requestRoutes = require('./routes/request');
const reportRoutes = require('./routes/report');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/reports', reportRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
