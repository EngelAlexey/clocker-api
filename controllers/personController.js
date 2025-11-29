const fileHelper = require('../utils/fileHelper');
const FILE_NAME = 'people.json';

exports.getAll = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    res.json(data);
};

exports.getById = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const person = data.find(p => p.id === req.params.id);
    if (person) res.json(person);
    else res.status(404).json({ message: "Person not found" });
};

exports.create = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const newPerson = req.body;

    if (!newPerson.id || !newPerson.name) {
        return res.status(400).json({ message: "ID and Name are required" });
    }

    if (data.find(p => p.id === newPerson.id)) {
        return res.status(400).json({ message: "Person already exists" });
    }

    data.push(newPerson);
    fileHelper.writeJson(FILE_NAME, data);
    res.status(201).json({ message: "Person created", person: newPerson });
};

exports.update = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const updatedPerson = req.body;
    const index = data.findIndex(p => p.id === updatedPerson.id);

    if (index !== -1) {
        data[index] = updatedPerson;
        fileHelper.writeJson(FILE_NAME, data);
        res.json({ message: "Person updated", person: updatedPerson });
    } else {
        res.status(404).json({ message: "Person not found" });
    }
};

exports.delete = (req, res) => {
    let data = fileHelper.readJson(FILE_NAME);
    const initialLength = data.length;
    data = data.filter(p => p.id !== req.params.id);

    if (data.length < initialLength) {
        fileHelper.writeJson(FILE_NAME, data);
        res.json({ message: "Person deleted" });
    } else {
        res.status(404).json({ message: "Person not found" });
    }
};
