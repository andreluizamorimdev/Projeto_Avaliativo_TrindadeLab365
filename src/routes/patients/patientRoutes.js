const { Router } = require('express');


const createPatient = require('../../controllers/patients/createPatient');
const updatePatient = require('../../controllers/patients/updatePatient');
const findAllPatient = require('../../controllers/patients/findAllPatient');

const validateNewPatient = require('../../middlewares/patients/validate-new-patient');
const validateUpdatePatient = require('../../middlewares/patients/validate-update-patient');

const patientRoutes = new Router();

patientRoutes.post('/api/pacientes', validateNewPatient, createPatient);

patientRoutes.put('/api/pacientes/:id', validateUpdatePatient, updatePatient);

patientRoutes.get('/api/pacientes', findAllPatient);

module.exports = patientRoutes;