const { Router } = require('express');


const createPatient = require('../../controllers/patients/createPatient');
const updatePatient = require('../../controllers/patients/updatePatient');
const updateAttendanceStatus = require('../../controllers/patients/updateAttendanceStatus');
const findAllPatient = require('../../controllers/patients/findAllPatient');
const findOnePatient = require('../../controllers/patients/findOnePatient');
const deletePatient = require('../../controllers/patients/deletePatient');

const validateNewPatient = require('../../middlewares/patients/validate-new-patient');
const validateUpdatePatient = require('../../middlewares/patients/validate-update-patient');

const patientRoutes = new Router();

patientRoutes.post('/api/pacientes', validateNewPatient, createPatient);

patientRoutes.put('/api/pacientes/:id', validateUpdatePatient, updatePatient);

patientRoutes.put('/api/pacientes/:id/status/', updateAttendanceStatus);

patientRoutes.get('/api/pacientes', findAllPatient);

patientRoutes.get('/api/pacientes/:id', findOnePatient);

patientRoutes.delete('/api/pacientes/:id', deletePatient);

module.exports = patientRoutes;