const { Sequelize } = require('sequelize');
const connection = require("../database");
const Patient = require('./patient');
const Doctor = require('./doctor');

const MedicAttendance = connection.define('medic_attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

MedicAttendance.belongsTo(Patient, { foreignKey: 'patient_id' });
MedicAttendance.belongsTo(Doctor, { foreignKey: 'doctor_id' });

module.exports = MedicAttendance;