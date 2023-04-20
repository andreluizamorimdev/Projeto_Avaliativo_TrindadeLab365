const Doctor = require("../../models/doctor");

async function deleteDoctor(request, response) {
    try {
        const { id } = request.params;

        const doctorInDatabase = await Doctor.findByPk(id);

        if(!doctorInDatabase) {
            return response.status(404).json({ message: 'Médico(a) não foi encontrado(a)' });
        }

        if(doctorInDatabase.total_attendances > 0 ) {
            return response.status(409).json({ message: 'Médico(a) possui atendimentos realizados cadastrados'});
        }

        await Doctor.destroy({ where: { id: id } });
        response.status(204).json();

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = deleteDoctor;