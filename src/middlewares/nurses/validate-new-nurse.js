const Yup = require("yup");
const Nurse = require("../../models/nurse");

const nurseSchema = Yup.object().shape({
    full_name: Yup.string()
        .required('O nome completo é obrigatório')
        .matches(/^[a-zA-ZÀ-ú\s]+$/, 'O nome completo deve conter apenas letras e espaços'),
    gender: Yup.string()
        .oneOf(['FEMININO', 'MASCULINO', 'OUTRO'], 'O gênero deve ser FEMININO, MASCULINO ou OUTRO'),
    birth_date: Yup.date()
        .required('A data de nascimento é obrigatória')
        .typeError('A data de nascimento deve ser uma data válida'),
    cpf: Yup.string()
        .required('O CPF é obrigatório')
        .matches(/^\d{11}$/, 'O CPF deve conter apenas números e ter 11 dígitos')
        .test('unique', 'Este Enfermeiro(a) já foi cadastrado(a)', async (cpf) => {
            const nurse = await Nurse.findOne({ where: { cpf: cpf } });
            return !nurse;
        }),
    phone_number: Yup.string()
        .matches(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/, 'O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX'),
    education_institution: Yup.string()
        .required('A instituição de ensino da formação é obrigatória').matches(/^[a-zA-Z\s]+$/, 'A instituição de ensino da formação deve conter apenas letras e espaços'),
    cofen_uf: Yup.string()
        .required('O campo cofen/uf é obrigatório')
        .matches(/^[A-Z]{2}\d{10}$/, 'O campo cofen/uf deve estar no formato UF1234567890')
});

async function validateNewNurse(request, response, next) {
    try {
        await nurseSchema.validate(request.body, { abortEarly: false });
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

module.exports = validateNewNurse;