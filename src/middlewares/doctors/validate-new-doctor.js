const Yup = require("yup");
const Doctor = require('../../models/doctor');

const doctorSchema = Yup.object().shape({
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
      .test('unique', 'Este médico(a) já foi cadastrado(a)', async (cpf) => {
        const doctor = await Doctor.findOne({ where: { cpf: cpf } });
        return !doctor;
      }),
    phone_number: Yup.string()
      .matches(/^\(\d{2}\)\s\d{4,5}-?\d{4}$/, 'O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX'),
    education_institution: Yup.string()
      .required('A instituição de ensino da formação é obrigatória'),
    crm_uf: Yup.string()
      .required('O cadastro do CRM/UF é obrigatório')
      .test('is-valid-uf', 'UF inválido', (uf) => {
          const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
          return !uf || ufs.includes(uf.toUpperCase());
      }),
    clinical_specialization: Yup.string()
      .required('A especialização clínica é obrigatória')
      .oneOf(['CLINICO_GERAL', 'ANESTESISTA', 'DERMATOLOGIA', 'GINECOLOGIA', 'NEUROLOGIA', 'PEDIATRIA', 'PSIQUIATRIA', 'ORTOPEDIA'], 'A especialização clínica deve ser CLINICO_GERAL, ANESTESISTA, DERMATOLOGIA, GINECOLOGIA, NEUROLOGIA, PEDIATRIA, PSIQUIATRIA, ORTOPEDIA'),
    status: Yup.string()
      .oneOf(['ATIVO', 'INATIVO'], 'O estado do médico no sistema deve ser ATIVO ou INATIVO')
      .default('ATIVO'),
    total_attendances: Yup.number()
      .integer()
      .min(0)
      .default(0)
  });

async function validateNewDoctor(request, response, next) {
    try {
        await doctorSchema.validate(request.body, { abortEarly: false });
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

module.exports = validateNewDoctor;