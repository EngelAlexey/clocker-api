const fileHelper = require('../utils/fileHelper');
const FILE_NAME = 'clocks.json';

exports.getAll = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    res.json(data);
};

exports.getByPersonId = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const clocks = data.filter(c => c.idPerson === req.params.idPerson);
    res.json(clocks);
};

exports.create = (req, res) => {
    const data = fileHelper.readJson(FILE_NAME);
    const newClock = req.body;
    
    if(!newClock.idClock) newClock.idClock = Date.now().toString();

    data.push(newClock);
    fileHelper.writeJson(FILE_NAME, data);
    res.status(201).json({ message: "Clock record created", clock: newClock });
};
