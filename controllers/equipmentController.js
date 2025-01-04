const Equipment = require("../models/Equipment");

exports.getAllEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.findAll();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve equipments" });
  } 
};

exports.addEquipment = async (req, res) => {
  const { name, qty,deviceid ,description} = req.body; 
  let date = new Date();
  console.log(req.body)
  try {
    const id = await Equipment.create({ name, qty, date,deviceid,description });
    res.status(201).json({ message: "Equipment added successfully", id });
  } catch (error) {
    res.status(500).json({ error: "Failed to add equipment" });
  }
};

exports.updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { name, qty, date,deviceid,description } = req.body;
  try {
    const result = await Equipment.update(id, { name, qty, date,deviceid,description });
    if (result) {
      res.status(200).json({ message: "Equipment updated successfully" });
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update equipment" });
  }
};

exports.deleteEquipment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Equipment.delete(id);
    if (result) {
      res.status(200).json({ message: "Equipment deleted successfully" });
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete equipment" });
  }
};
