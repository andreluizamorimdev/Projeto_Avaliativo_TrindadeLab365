const Yup = require('yup');
const Patient = require("../../models/patient");

const updatePatientSchema = Yup.object().shape({
    full_name: Yup.string().optional().matches(/^[a-zA-Z\s]+$/, 'O nome completo deve conter apenas letras e espaços'),
    gender: Yup.string().optional().oneOf(['MASCULINO', 'FEMININO'], 'O gênero deve ser MASCULINO ou FEMININO'),
    birth_date: Yup.date().optional().typeError('A data de nascimento deve ser uma data válida'),
    cpf: Yup.string().optional().matches(/^\d{11}$/, 'O CPF deve conter 11 dígitos'),
    phone_number: Yup.string().optional().matches(/^\(\d{2}\)\s\d{4,5}\-\d{4}$/, 'O número de telefone deve estar no formato (XX) XXXX-XXXXX'),
    emergency_contact: Yup.string().optional().matches(/^[a-zA-Z\s]+$/, 'O contato de emergência deve conter apenas letras e espaços'),
    allergies_list: Yup.string().optional(),
    specific_care_list: Yup.string().optional(),
    health_insurance_plan: Yup.string().optional().matches(/^[a-zA-Z\s]+$/, 'O plano de saúde deve conter apenas letras e espaços')
});

async function validateUpdatePatient(request, response, next) {
    try {
        await updatePatientSchema.validate(request.body, { abortEarly: false });
        return next();
    } catch (error) {
        const errors = error.inner.map((e)=> ({ field: e.path, message: e.message }));

        return response.status(400).json(errors);
    }
}

module.exports = validateUpdatePatient;