const Yup = require("yup");
const Patient = require("../models/patient");

const patientSchema = Yup.object().shape({
    full_name: Yup.string().required('O nome completo é obrigatório'),
    gender: Yup.string().oneOf(['FEMININO', 'MASCULINO', 'OUTRO'], 'O gênero deve ser FEMININO, MASCULINO ou OUTRO'),
    birth_date: Yup.date().required('A data de nascimento é obrigatória').typeError('A data de nascimento deve ser uma data válida'),
    cpf: Yup.string().required('O CPF é obrigatório').matches(/^\d{11}$/, 'O CPF deve conter 11 dígitos').test('unique', 'Este paciente já foi cadastrado', async (value) => {
        const patient = await Patient.findOne({ where: { cpf: value } });
        return !patient;
    }),
    phone_number: Yup.string().matches(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/, 'O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX'),
    emergency_contact: Yup.string().matches(/^[a-zA-Z\u00C0-\u017F\s]+$/, 'O contato de emergência deve conter apenas letras e espaços').required('O contato de emergência é obrigatório'),
    allergies_list: Yup.string(),
    specific_care_list: Yup.string(),
    health_insurance_plan: Yup.string(),
    attendance_status: Yup.string().oneOf(['AGUARDANDO_ATENDIMENTO', 'EM_ATENDIMENTO', 'ATENDIDO', 'NÃO_ATENDIDO'], 'O status de atendimento deve ser AGUARDANDO_ATENDIMENTO, EM_ATENDIMENTO, ATENDIDO ou NÃO_ATENDIDO'),
    total_attendances: Yup.number().integer().min(0).default(0), 

});

async function validateNewPatient(request, response, next) {
    try {
        await patientSchema.validate(request.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map((e)=> ({ field: e.path, message: e.message }));

        // Verificar se o erro é de validação única (CPF já cadastrado)
        const uniqueError = error.inner.find(e => e.path === 'cpf' && e.type === 'unique');
        if (uniqueError) {
            const index = errors.findIndex(e => e.field === 'cpf');
            if (index !== -1) {
                errors.splice(index, 1);
            }
            errors.push({ message: uniqueError.message });
            return response.status(409).json(errors);
        }

        return response.status(400).json(errors);
        
    }
}

module.exports = validateNewPatient;