const { Sequelize } = require('sequelize');
const connection = require('../database');

const Patient = connection.define('patient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM("FEMININO","MASCULINO", "OUTRO")
    },
    birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: Sequelize.STRING
    },
    emergency_contact: {
        type: Sequelize.STRING,
        allowNull: false
    },
    allergies_list: {
        type: Sequelize.STRING
    },
    specific_care_list: {
        type: Sequelize.STRING
    },
    health_insurance_plan: {
        type: Sequelize.STRING
    },
    attendance_status: {
        type: Sequelize.ENUM("AGUARDANDO_ATENDIMENTO", "EM_ATENDIMENTO", "ATENDIDO", "NAO_ATENDIDO")
    },
    total_attendances: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
    
});

module.exports = Patient;