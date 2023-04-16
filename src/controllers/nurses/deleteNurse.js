const Nurse = require("../../models/nurse");

async function deleteNurse(request, response) {
    try {
        const { id } = request.params;

        const nurseInDatabase = await Nurse.findByPk(id);

        if (!nurseInDatabase) {
            return response.status(404).json({ message: 'Este Enfermeiro(a) não foi encontrado(a)' })
        }

        await Nurse.destroy({ where: { id: id } });
        response.status(204).json();

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = deleteNurse;