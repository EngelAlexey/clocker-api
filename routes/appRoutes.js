module.exports = function(app) {
    const person = require('../controllers/personController');
    const clock = require('../controllers/clockController');
    const attendance = require('../controllers/attendanceController');

    // --- RUTAS PERSONAL ---
    app.route('/api/people')
        .get(person.getAll)
        .post(person.create)
        .put(person.update);

    app.route('/api/people/:id')
        .get(person.getById)
        .delete(person.delete);

    // --- RUTAS MARCAS DE RELOJ ---
    app.route('/api/clocks')
        .get(clock.getAll)
        .post(clock.create);
    
    app.route('/api/clocks/person/:idPerson')
        .get(clock.getByPersonId);

    // --- RUTAS ASISTENCIAS ---
    app.route('/api/attendances')
        .get(attendance.getAll)
        .post(attendance.create)
        .put(attendance.update);

    app.route('/api/attendances/:id')
        .delete(attendance.delete);
};
