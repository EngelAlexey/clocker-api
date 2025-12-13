module.exports = function (app) {
    const person = require('../controllers/personController');
    const clock = require('../controllers/clockController');
    const attendance = require('../controllers/attendanceController');

    app.route('/api/people')
        .get(person.getAll)
        .post(person.create)
        .put(person.update);

    app.route('/api/people/:id')
        .get(person.getById)
        .delete(person.delete);

    app.route('/api/clocks')
        .get(clock.getAll)
        .post(clock.create)
        .put(clock.update);

    app.route('/api/clocks/search/date')
        .get(clock.searchByDate);

    app.route('/api/clocks/search/type')
        .get(clock.searchByType);

    app.route('/api/clocks/person/:idPerson')
        .get(clock.getByPersonId);

    app.route('/api/clocks/:id')
        .get(clock.getById)
        .delete(clock.delete);

    app.route('/api/attendances')
        .get(attendance.getAll)
        .post(attendance.create)
        .put(attendance.update);

    app.route('/api/attendances/search/date')
        .get(attendance.searchByDate);

    app.route('/api/attendances/search/person/:idPerson')
        .get(attendance.searchByPersonId);

    app.route('/api/attendances/search/type')
        .get(attendance.searchByType);

    app.route('/api/attendances/:id')
        .delete(attendance.delete);
};