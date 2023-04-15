const Yup = require('yup');

const updateDoctorSchema = Yup.object().shape({
    full_name: Yup.string().optional().matches(/^[a-zA-ZÀ-ú\s]+$/, 'O nome completo deve conter apenas letras e espaços'),
    gender: Yup.string().optional().oneOf(['FEMININO', 'MASCULINO', 'OUTRO'], 'O gênero deve ser FEMININO, MASCULINO ou OUTRO'),
    birth_date: Yup.date().optional().typeError('A data de nascimento deve ser uma data válida'),
    cpf: Yup.string().optional().matches(/^\d{11}$/, 'O CPF deve conter apenas números e ter 11 dígitos'),
    phone_number: Yup.string().optional().matches(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/, 'O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX'),
    education_institution: Yup.string().optional().matches(/^[a-zA-Z\s]+$/, 'A instituição de ensino da formação deve conter apenas letras e espaços'),
    crm_uf: Yup.string().optional().test('is-valid-uf', 'UF inválido', (uf) => {
        const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        return !uf || ufs.includes(uf.toUpperCase());
    }),
    clinical_specialization: Yup.string().optional().oneOf(['CLINICO_GERAL', 'ANESTESISTA', 'DERMATOLOGIA', 'GINECOLOGIA', 'NEUROLOGIA', 'PEDIATRIA', 'PSIQUIATRIA', 'ORTOPEDIA'], 'A especialização clínica deve ser CLINICO_GERAL, ANESTESISTA, DERMATOLOGIA, GINECOLOGIA, NEUROLOGIA, PEDIATRIA, PSIQUIATRIA, ORTOPEDIA')
  });

async function validateUpdateDoctor(request, response, next) {
    try {
        await updateDoctorSchema.validate(request.body, { abortEarly: false });
        return next();
    } catch (error) {
        const errors = error.inner.map((e)=> ({ field: e.path, message: e.message }));
        return response.status(400).json(errors);
    }
}

module.exports = validateUpdateDoctor;