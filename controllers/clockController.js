const fileHelper = require('../utils/fileHelper');
const FILE_NAME = 'clocks.json';

exports.getAll = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    res.json(data);
};

exports.getById = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const result = data.find(c => String(c.idClock) === String(req.params.id));
    result ? res.json(result) : res.status(404).json({ message: "Not found" });
};

exports.getByPersonId = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const result = data.filter(c => String(c.idPerson) === String(req.params.idPerson));
    res.json(result);
};

exports.create = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const newClock = req.body;
    if (!newClock.idClock) newClock.idClock = Date.now().toString();
    data.push(newClock);
    fileHelper.writeJson(FILE_NAME, data);
    res.status(201).json(newClock);
};

exports.update = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const updated = req.body;
    const index = data.findIndex(c => String(c.idClock) === String(updated.idClock));
    if (index !== -1) {
        data[index] = updated;
        fileHelper.writeJson(FILE_NAME, data);
        res.json(updated);
    } else {
        res.status(404).json({ message: "Not found" });
    }
};

exports.delete = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const initialLength = data.length;

    const newData = data.filter(c => String(c.idClock) !== String(req.params.id));

    if (newData.length < initialLength) {
        fileHelper.writeJson(FILE_NAME, newData);
        res.json({ message: "Deleted" });
    } else {
        res.status(404).json({ message: "Not found" });
    }
};

exports.searchByDate = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const dateParam = req.query.date;
    const result = data.filter(c => c.dateClock && c.dateClock.includes(dateParam)); res.json(result);
};

exports.searchByType = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const typeParam = req.query.type;
    const result = data.filter(c => c.type === typeParam);
    res.json(result);
};