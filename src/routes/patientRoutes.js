const { Router } = require('express');


const createPatient = require('../controllers/createPatient');

const validateNewPatient = require('../middlewares/validate-new-patient');

const patientRoutes = new Router();

patientRoutes.post('/api/pacientes', validateNewPatient, createPatient);



module.exports = patientRoutes;