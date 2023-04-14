const Patient = require("../../models/patient");

const Yup = require('yup');

const filterSchema = Yup.object().shape({
    status: Yup.string().oneOf(['AGUARDANDO_ATENDIMENTO', 'EM_ATENDIMENTO', 'ATENDIDO', 'NAO_ATENDIDO'], 'O status de atendimento deve ser AGUARDANDO_ATENDIMENTO, EM_ATENDIMENTO, ATENDIDO ou NAO_ATENDIDO')
});

async function findAllPatient (request, response) {
    try {
        const filters = request.query;

        await filterSchema.validate(filters, { abortEarly: false });

        if(filters.status) {
            const patients = await Patient.findAll(
                { 
                    where: { 
                        attendance_status: filters.status
                    }  
                }
            );
    
            response.json(patients);
        } else {
            const patients = await Patient.findAll();
    
            response.json(patients);
        }
        

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = findAllPatient;