const fileHelper = require('../utils/fileHelper');
const FILE_NAME = 'attendances.json';

exports.getAll = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    res.json(data);
};

exports.getById = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const result = data.find(a => String(a.idAttendance) === String(req.params.id));
    result ? res.json(result) : res.status(404).json({ message: "Not found" });
};

exports.create = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const newAttendance = req.body;

    if (!newAttendance.idAttendance) newAttendance.idAttendance = Date.now().toString();

    data.push(newAttendance);
    fileHelper.writeJson(FILE_NAME, data);
    res.status(201).json(newAttendance);
};

exports.update = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const updated = req.body;

    const index = data.findIndex(a => String(a.idAttendance) === String(updated.idAttendance));

    if (index !== -1) {
        data[index] = updated;
        fileHelper.writeJson(FILE_NAME, data);
        res.json(updated);
    } else {
        res.status(404).json({ message: "Attendance not found for update" });
    }
};

exports.delete = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const initialLength = data.length;

    data = data.filter(a => String(a.idAttendance) !== String(req.params.id));

    if (data.length < initialLength) {
        fileHelper.writeJson(FILE_NAME, data);
        res.json({ message: "Attendance deleted" });
    } else {
        res.status(404).json({ message: "Attendance not found for delete" });
    }
};

exports.searchByDate = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const dateParam = req.query.date;
    const result = data.filter(a => a.date && a.date.includes(dateParam));
    res.json(result);
};

exports.searchByPersonId = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const idPerson = req.params.idPerson;
    const result = data.filter(a => String(a.idPerson) === String(idPerson));
    res.json(result);
};

exports.searchByType = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const typeParam = req.query.type;
    const result = data.filter(a => a.type === typeParam);
    res.json(result);
};