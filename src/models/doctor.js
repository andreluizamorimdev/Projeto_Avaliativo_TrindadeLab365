const { Sequelize } = require('sequelize');
const connection = require("../database");

const Doctor = connection.define('doctor', {
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
    education_institution: {
        type: Sequelize.STRING,
        allowNull: false
    },
    crm_uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clinical_specialization: {
        type: Sequelize.ENUM("CLINICO_GERAL", "ANESTESISTA", "DERMATOLOGIA", "GINECOLOGIA", "NEUROLOGIA", "PEDIATRIA", "PSIQUIATRIA", "ORTOPEDIA"),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("ATIVO", "INATIVO"),
        defaultValue: "ATIVO"
    },
    total_attendances: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = Doctor;