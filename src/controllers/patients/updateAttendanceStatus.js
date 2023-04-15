const Patient = require("../../models/patient");

const Yup = require('yup');

const attendanceStatusUpdateSchema = Yup.object().shape({
    attendance_status: Yup.string()
        .oneOf(['AGUARDANDO_ATENDIMENTO', 'EM_ATENDIMENTO', 'ATENDIDO', 'NAO_ATENDIDO'], 'O status de atendimento deve ser AGUARDANDO_ATENDIMENTO, EM_ATENDIMENTO, ATENDIDO ou NAO_ATENDIDO')
        .required('Status de atendimento é obrigatório')
});

async function updateAttendanceStatus(request, response) {
    try {
        const { id } = request.params;

        const { attendance_status } = request.body;

        const patientInDatabase = await Patient.findByPk(id);

        if (!patientInDatabase) {
            return response.status(404).json({ message: 'Paciente não encontrado.' });
        }

        //validar os dados usando o schema do yup
        await attendanceStatusUpdateSchema.validate(attendance_status, { abortEarly: false });

        patientInDatabase.attendance_status = attendance_status;

        await patientInDatabase.save();

        response.status(200).json(patientInDatabase);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = error.inner.map(e => ({ field: e.path, message: e.message }));
            return response.status(400).json(errors);
        } else {
            return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
        }
    }
}

module.exports = updateAttendanceStatus;