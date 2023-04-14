const Patient = require("../../models/patient");

async function findOnePatient(request, response) {
    try {
        const { id } = request.params;

        const patient = await Patient.findOne({ where: { id: id }});

        if (!patient) {
            return response.status(404).json({ message: 'Paciente não encontrado.' });
        }

        response.json(patient);


    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = findOnePatient;