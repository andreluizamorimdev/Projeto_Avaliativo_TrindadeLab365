const Doctor = require("../../models/doctor");

async function deleteDoctor(request, response) {
    try {
        const { id } = request.params;

        const doctorInDatabase = await Doctor.findByPk(id);

        if(!doctorInDatabase) {
            return response.status(404).json({ message: 'Médico(a) não foi encontrado(a)' });
        }

        await Doctor.destroy({ where: { id: id } });
        response.status(204).json();

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = deleteDoctor;