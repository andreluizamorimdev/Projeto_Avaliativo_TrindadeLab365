const Nurse = require("../../models/nurse");

async function updateNurse(request, response) {
    try {
        const { id } = request.params;

        const nurseInDatabase = await Nurse.findByPk(id);

        if (!nurseInDatabase) {
            return response.status(404).json({ message: 'Este Enfermeiro(a) não foi encontrado(a)' })
        }

        nurseInDatabase.full_name = request.body.full_name || nurseInDatabase.full_name;
        nurseInDatabase.gender = request.body.gender || nurseInDatabase.gender;
        nurseInDatabase.birth_date = request.body.birth_date || nurseInDatabase.birth_date;
        nurseInDatabase.cpf = request.body.cpf || nurseInDatabase.cpf;
        nurseInDatabase.phone_number = request.body.phone_number || nurseInDatabase.phone_number;
        nurseInDatabase.education_institution = request.body.education_institution || nurseInDatabase.education_institution;
        nurseInDatabase.cofen_uf = request.body.cofen_uf || nurseInDatabase.cofen_uf;

        await nurseInDatabase.save();
        response.json(nurseInDatabase);

    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = updateNurse;