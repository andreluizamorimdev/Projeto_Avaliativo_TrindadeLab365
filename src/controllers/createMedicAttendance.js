const MedicAttendance = require("../models/MedicAttendance");
const Yup = require('yup');
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

const medicAttendanceSchema = Yup.object().shape({
    patient_id: Yup.number().integer('Id do paciente deve ser um número inteiro').positive('Id do paciente deve ser um número positivo').required('Id do paciente é obrigatório'),
    doctor_id: Yup.number().required('Id do médico é obrigatório').integer('Id do médico deve ser um número inteiro').positive('Id do médico deve ser um número positivo')
});

async function createMedicAttendance(request, response) {
    try {
        const data = {
            patient_id: request.body.patient_id,
            doctor_id: request.body.doctor_id
        }

        //validação dos dados com yup
        await medicAttendanceSchema.validate(request.body, { abortEarly: false });

        //verificando se paciente existe
        const patient = await Patient.findByPk(data.patient_id);
        if (!patient) {
            return response.status(404).json({ message: 'Paciente não foi encontrado' });
        }

        //verificando se medico existe
        const doctor = await Doctor.findByPk(data.doctor_id);
        if (!doctor) {
            return response.status(404).json({ message: 'Médico(a) não foi encontrado(a)' });
        }

        patient.total_attendances += 1;
        patient.attendance_status = 'ATENDIDO';
        await patient.save();

        doctor.total_attendances += 1;
        await doctor.save();

        const medic_attendance = await MedicAttendance.create(data);
        response.status(200).json({
            medic_attendance,
            patient,
            doctor
        });


    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = error.inner.map(e => ({ field: e.path, message: e.message }));
            return response.status(400).json(errors);
        } else {
            console.log(error);
            return response.status(500).json({ message: 'Não foi possível processar a solicitação' });
        }
    }
}

module.exports = createMedicAttendance;