const Patient = require("../../models/patient");

async function updatePatient(request, response) {
    try {
        const { id } = request.params;
        
        const patientInDatabase = await Patient.findByPk(id);

        if (!patientInDatabase) {
            return response.status(404).json({ message: 'Paciente não encontrado.' });
        }

        patientInDatabase.full_name = request.body.full_name || patientInDatabase.full_name;
        patientInDatabase.gender = request.body.gender || patientInDatabase.gender;
        patientInDatabase.birth_date = request.body.birth_date || patientInDatabase.birth_date;
        patientInDatabase.cpf = request.body.cpf || patientInDatabase.cpf;
        patientInDatabase.phone_number = request.body.phone_number || patientInDatabase.phone_number;
        patientInDatabase.emergency_contact = request.body.emergency_contact || patientInDatabase.emergency_contact;
        patientInDatabase.allergies_list = request.body.allergies_list || patientInDatabase.allergies_list;
        patientInDatabase.health_insurance_plan = request.body.health_insurance_plan || patientInDatabase.health_insurance_plan;

        await patientInDatabase.save();

        response.json(patientInDatabase);

    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = updatePatient;