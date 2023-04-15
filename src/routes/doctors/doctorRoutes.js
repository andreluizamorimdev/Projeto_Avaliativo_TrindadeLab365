const { Router } = require('express');


const validateNewDoctor = require('../../middlewares/doctors/validate-new-doctor');
const validateUpdateDoctor = require('../../middlewares/doctors/validate-update-doctor');

const createDoctor = require('../../controllers/doctors/createDoctor');
const updateDoctor = require('../../controllers/doctors/updateDoctor');


const doctorRoutes = new Router();

doctorRoutes.post('/api/medicos', validateNewDoctor, createDoctor);
doctorRoutes.put('/api/medicos/:id',validateUpdateDoctor, updateDoctor);

module.exports = doctorRoutes;