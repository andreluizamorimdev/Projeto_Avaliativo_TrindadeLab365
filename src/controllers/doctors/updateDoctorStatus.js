const Doctor = require('../../models/doctor');

const Yup = require('yup');

const doctorStatusUpdateSchema = Yup.object().shape({
    status: Yup.string()
      .oneOf(['ATIVO', 'INATIVO'], 'O estado do médico no sistema deve ser ATIVO ou INATIVO')
      .default('ATIVO')
});

async function updateDoctorStatus(request, response) {
    try {
        const { id } = request.params;

        const { status } = request.body;

        const doctorInDatabase = await Doctor.findByPk(id);

        if (!doctorInDatabase) {
            return response.status(404).json({ message: 'Médico(a) não foi encontrado(a)' })
        }

        //validando os dados usando o schema do yup
        await doctorStatusUpdateSchema.validate(request.body, { abortEarly: false });

        doctorInDatabase.status = status;

        await doctorInDatabase.save();
        response.status(200).json(doctorInDatabase);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = error.inner.map(e => ({ field: e.path, message: e.message }));
            return response.status(400).json(errors);
        } else {
            return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
        }
    }
}

module.exports = updateDoctorStatus;