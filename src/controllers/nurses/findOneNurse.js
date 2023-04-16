const Nurse = require("../../models/nurse");

async function findOneNurse(request, response) {
    try {
        const { id } = request.params;

        const nurse = await Nurse.findByPk(id);

        if (!nurse) {
            return response.status(404).json({ message: 'Este Enfermeiro(a) não foi encontrado(a)' })
        }

        response.json(nurse);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = findOneNurse;