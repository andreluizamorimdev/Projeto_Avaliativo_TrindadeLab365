const Doctor = require('../../models/doctor');

async function createDoctor(request, response) {
    try {
        const data = {
            full_name: request.body.full_name,
            gender: request.body.gender,
            birth_date: request.body.birth_date,
            cpf: request.body.cpf,
            phone_number: request.body.phone_number,
            education_institution: request.body.education_institution,
            crm_uf: request.body.crm_uf,
            clinical_specialization: request.body.clinical_specialization,
            status: request.body.status,
            total_attendances: request.body.total_attendances
        }

        const doctor = await Doctor.create(data);
        response.status(201).json(doctor);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = createDoctor;