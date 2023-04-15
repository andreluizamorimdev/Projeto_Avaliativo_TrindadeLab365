const { Router } = require('express');


const validateNewNurse = require('../../middlewares/nurses/validate-new-nurse');
const validateUpdateNurse = require('../../middlewares/nurses/validate-update-nurse');

const createNurse = require('../../controllers/nurses/createNurse');
const updateNurse = require('../../controllers/nurses/updateNurse');

const nurseRoutes = new Router();

nurseRoutes.post('/api/enfermeiros',validateNewNurse, createNurse);
nurseRoutes.put('/api/enfermeiros/:id',validateUpdateNurse, updateNurse);

module.exports = nurseRoutes;