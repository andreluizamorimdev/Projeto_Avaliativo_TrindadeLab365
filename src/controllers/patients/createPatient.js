const Patient = require("../../models/patient");

async function createPatient(request, response) {
    try {
        const data = {
            full_name: request.body.full_name,
            gender: request.body.gender,
            birth_date: request.body.birth_date,
            cpf: request.body.cpf,
            phone_number: request.body.phone_number,
            emergency_contact: request.body.emergency_contact,
            allergies_list: request.body.allergies_list,
            specific_care_list: request.body.specific_care_list,
            health_insurance_plan: request.body.health_insurance_plan,
            attendance_status: request.body.attendance_status,
            total_attendances: request.body.total_attendances
        }

        const patient = await Patient.create(data);

        response.status(201).json(patient);

    } catch (error) {
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = createPatient;