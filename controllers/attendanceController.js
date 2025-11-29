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
    res.status(201).json({ message: "Attendance created", attendance: newAttendance });
};
