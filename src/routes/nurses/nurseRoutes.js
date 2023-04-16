const { Router } = require('express');


const validateNewNurse = require('../../middlewares/nurses/validate-new-nurse');
const validateUpdateNurse = require('../../middlewares/nurses/validate-update-nurse');

const createNurse = require('../../controllers/nurses/createNurse');
const updateNurse = require('../../controllers/nurses/updateNurse');
const findAllNurses = require('../../controllers/nurses/findAllNurses');
const findOneNurse = require('../../controllers/nurses/findOneNurse');
const deleteNurse = require('../../controllers/nurses/deleteNurse');

const nurseRoutes = new Router();

nurseRoutes.post('/api/enfermeiros',validateNewNurse, createNurse);
nurseRoutes.put('/api/enfermeiros/:id',validateUpdateNurse, updateNurse);
nurseRoutes.get('/api/enfermeiros', findAllNurses);
nurseRoutes.get('/api/enfermeiros/:id', findOneNurse);
nurseRoutes.delete('/api/enfermeiros/:id', deleteNurse);

module.exports = nurseRoutes;