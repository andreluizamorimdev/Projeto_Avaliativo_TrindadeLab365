const { Router } = require('express');


const createPatient = require('../../controllers/patients/createPatient');

const validateNewPatient = require('../../middlewares/patients/validate-new-patient');

const patientRoutes = new Router();

patientRoutes.post('/api/pacientes', validateNewPatient, createPatient);



module.exports = patientRoutes;