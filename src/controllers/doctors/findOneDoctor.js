const Doctor = require("../../models/doctor");

async function findOneDoctor(request, response) {
    try {
        const { id } = request.params;

        const doctor = await Doctor.findByPk(id);

        if(!doctor) {
            return response.status(404).json({ message: 'Médico(a) não foi encontrado(a)' });
        }

        response.json(doctor);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }   
}

module.exports = findOneDoctor;