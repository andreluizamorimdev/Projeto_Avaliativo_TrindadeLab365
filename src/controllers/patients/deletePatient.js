const Patient = require("../../models/patient");

async function deletePatient(request, response) {
    try {
        const { id } = request.params;

        const patientInDatabase = await Patient.findByPk(id);

        if (!patientInDatabase) {
            return response.status(404).json({ message: 'Paciente não encontrado.' });
        }

        await Patient.destroy({ where: { id: id } });
        response.status(204); 

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = deletePatient;