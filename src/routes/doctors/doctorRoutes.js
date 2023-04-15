const { Router } = require('express');


const validateNewDoctor = require('../../middlewares/doctors/validate-new-doctor');
const validateUpdateDoctor = require('../../middlewares/doctors/validate-update-doctor');

const createDoctor = require('../../controllers/doctors/createDoctor');
const updateDoctor = require('../../controllers/doctors/updateDoctor');
const updateDoctorStatus = require('../../controllers/doctors/updateDoctorStatus');
const findAllDoctors = require('../../controllers/doctors/findAllDoctors');
const findOneDoctor = require('../../controllers/doctors/findOneDoctor');
const deleteDoctor = require('../../controllers/doctors/deleteDoctor');


const doctorRoutes = new Router();

doctorRoutes.post('/api/medicos', validateNewDoctor, createDoctor);
doctorRoutes.put('/api/medicos/:id',validateUpdateDoctor, updateDoctor);
doctorRoutes.put('/api/medicos/:id/status', updateDoctorStatus);
doctorRoutes.get('/api/medicos', findAllDoctors);
doctorRoutes.get('/api/medicos/:id', findOneDoctor);
doctorRoutes.delete('/api/medicos/:id', deleteDoctor);

module.exports = doctorRoutes;