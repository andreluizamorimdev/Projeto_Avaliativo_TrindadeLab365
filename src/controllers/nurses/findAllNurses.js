const Nurse = require("../../models/nurse");

async function findAllNurses(request, response) {
    try {
        const nurses = await Nurse.findAll();
        
        response.json(nurses);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = findAllNurses;