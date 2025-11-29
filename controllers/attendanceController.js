const fileHelper = require('../utils/fileHelper');
const FILE_NAME = 'attendances.json';

exports.getAll = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    res.json(data);
};

exports.create = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const newAttendance = req.body;
    if(!newAttendance.idAttendance) newAttendance.idAttendance = Date.now().toString();
    data.push(newAttendance);
    fileHelper.writeJson(FILE_NAME, data);
    res.status(201).json(newAttendance);
};

exports.update = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const updated = req.body;
    const index = data.findIndex(a => a.idAttendance === updated.idAttendance);
    
    if (index !== -1) {
        data[index] = updated;
        fileHelper.writeJson(FILE_NAME, data);
        res.json(updated);
    } else {
        res.status(404).json({ message: "Attendance not found" });
    }
};

exports.delete = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const initialLength = data.length;
    data = data.filter(a => a.idAttendance !== req.params.id);

    if (data.length < initialLength) {
        fileHelper.writeJson(FILE_NAME, data);
        res.json({ message: "Attendance deleted" });
    } else {
        res.status(404).json({ message: "Attendance not found" });
    }
};