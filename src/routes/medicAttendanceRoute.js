const { Router } = require('express');

const createMedicAttendance = require('../controllers/createMedicAttendance');

const medicAttendanceRoute = new Router();

medicAttendanceRoute.post('/api/atendimentos', createMedicAttendance);

module.exports = medicAttendanceRoute;