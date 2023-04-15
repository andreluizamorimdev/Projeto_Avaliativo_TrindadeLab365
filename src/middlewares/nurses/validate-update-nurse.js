const Yup = require('yup');

const updateNurseSchema = Yup.object().shape({
    full_name: Yup.string().optional().matches(/^[a-zA-ZÀ-ú\s]+$/, 'O nome completo deve conter apenas letras e espaços'),
    gender: Yup.string().optional().oneOf(['FEMININO', 'MASCULINO', 'OUTRO'], 'O gênero deve ser FEMININO, MASCULINO ou OUTRO'),
    birth_date: Yup.date().optional().typeError('A data de nascimento deve ser uma data válida'),
    cpf: Yup.string().optional().matches(/^\d{11}$/, 'O CPF deve conter apenas números e ter 11 dígitos'),
    phone_number: Yup.string().optional().matches(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/, 'O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX'),
    education_institution: Yup.string().optional().matches(/^[a-zA-Z\s]+$/, 'A instituição de ensino da formação deve conter apenas letras e espaços'),
    cofen_uf: Yup.string().optional().matches(/^[A-Z]{2}\d{10}$/, 'O campo cofen/uf deve estar no formato UF1234567890')
});

async function validateUpdateNurse(request, response, next) {
    try {
        await updateNurseSchema.validate(request.body, { abortEarly: false });
        return next();
    } catch (error) {
        const errors = error.inner.map((e)=> ({ field: e.path, message: e.message }));
        return response.status(400).json(errors);
    }
}

module.exports = validateUpdateNurse;