const Nurse = require("../../models/nurse");

async function createNurse(request, response) {
    try {
        const data = {
            full_name: request.body.full_name,
            gender: request.body.gender,
            birth_date: request.body.birth_date,
            cpf: request.body.cpf,
            phone_number: request.body.phone_number,
            education_institution: request.body.education_institution,
            cofen_uf: request.body.cofen_uf            
        }

        const nurse = await Nurse.create(data);
        response.status(201).json(nurse);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = createNurse;