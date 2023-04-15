
const Yup = require('yup');
const Doctor = require('../../models/doctor');

const filterSchema = Yup.object().shape({
    status: Yup.string().oneOf(['ATIVO', 'INATIVO'], 'O estado do médico no sistema deve ser ATIVO ou INATIVO').default('ATIVO')
});

async function findAllDoctors(request, response) {
    try {
        const filters = request.query;

        await filterSchema.validate(filters, { abortEarly:false });

        if(filters.status) {
            const doctors = await Doctor.findAll({ where: { status: filters.status } });
            response.json(doctors);
        } else {
            const doctors = await Doctor.findAll();
            response.json(doctors);
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
    }
}

module.exports = findAllDoctors;