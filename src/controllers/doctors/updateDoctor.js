const Doctor = require("../../models/doctor");

async function updateDoctor(request, response) {
    try {
        const { id } = request.params;

        const doctorInDatabase = await Doctor.findByPk(id);

        if (!doctorInDatabase) {
            return response.status(404).json({ message: 'Médico(a) não foi encontrado(a)' });
        }

        doctorInDatabase.full_name = request.body.full_name || doctorInDatabase.full_name;
        doctorInDatabase.gender = request.body.gender || doctorInDatabase.gender;
        doctorInDatabase.birth_date = request.body.birth_date || doctorInDatabase.birth_date;
        doctorInDatabase.cpf = request.body.cpf || doctorInDatabase.cpf;
        doctorInDatabase.phone_number = request.body.phone_number || doctorInDatabase.phone_number;
        doctorInDatabase.education_institution = request.body.education_institution || doctorInDatabase.education_institution;
        doctorInDatabase.crm_uf = request.body.crm_uf || doctorInDatabase.crm_uf;
        doctorInDatabase.clinical_specialization = request.body.clinical_specialization || doctorInDatabase.clinical_specialization;

        await doctorInDatabase.save();
        response.json(doctorInDatabase);
               
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = updateDoctor;