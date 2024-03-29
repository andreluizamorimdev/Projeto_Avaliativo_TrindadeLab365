# LabMedicine Gerenciamento de hospital

> A API de gerenciamento de hospital da LabMedicine tem como objetivo principal facilitar o processo de atendimento aos pacientes e gerenciamento de informações do hospital. Utilizando a api é possível armazenar com facilidade todas as informações referentes aos pacientes, médicos e enfermeiros, também armazena os dados dos atendimentos ligados aos pacientes e médicos envolvidos no processo de atendimento. 


## Tecnologias utilizadas

O projeto foi criado utilizando javascript Node.js, Express, Sequelize em conjunto com outras dependencias que são elas: Yup, pg pg-hstore, e nodemon de dependencia-dev.

| Tecnologias   | Documentação       |
| :---------- | :--------- |
| [![node](https://nodejs.org/static/images/logo.svg)](https://nodejs.org/en) | https://nodejs.org/en/docs | 
| [![Express](https://bs-uploads.toptal.io/blackfish-uploads/components/skill_page/content/logo_file/logo/195562/express_js-161052138fa79136c0474521906b55e2.png)](https://expressjs.com/pt-br/) | https://expressjs.com/pt-br/4x/api.html |
| [![Sequelize](https://cdn.iconscout.com/icon/free/png-256/sequelize-3-1175091.png)](https://sequelize.org/) | https://sequelize.org/docs/v6/getting-started/ |


| Dependencias   | Documentação    |   
| :---------- | :--------- |
| Yup | https://www.npmjs.com/package/yup |
| Pg | https://www.npmjs.com/package/pg  |
| Pg-hstore | https://www.npmjs.com/package/pg-hstore |
| nodemon | https://www.npmjs.com/package/nodemon |

## Técnicas utilizadas

Organizei o projeto em pastas models, database, middlewares, controllers e routes seguindo as boas praticas ensinadas em sala de aula para uma melhor visualização/organização dos arquivos tornando assim de facil acesso em caso de correções.

![Tecnicas utilizadas](https://i.imgur.com/8cfFnId.png)

## Requitos

Ter o node.js na versão 16+ \
PostgreSql com a seguinte database criada: **labmedicinebd**  \
Insomnia ou outro aplicativo para passar as requisições como Postman por exemplo.


## Como executar

Clone o projeto

```bash
  git clone https://github.com/andreluizamorimdev/Projeto_Avaliativo_TrindadeLab365.git
```

Entre no diretório do projeto

```bash
  cd Projeto_Avaliativo_TrindadeLab365
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env você também pode encontrar um exemplo em .env-example

`API_SERVER_PORT`

`DIALECT_DATABASE`

`HOST_DATABASE`

`USER_DATABASE`

`PASSWORD_DATABASE`

`PORT_DATABASE`

`NAME_DATABASE`

## Melhorias que podem ser aplicadas

> Como melhoria eu proponho que cria-se um sistema de login e autentificação com token validos para acesso restrito de algumas funcionalidades, seria interessante também utilizar o swagger para criação da documentação do projeto bem especificada, outra melhoria interessante seria implementar uma seção de agendamentos para que seja possivel os pacientes agendarem consultas com médicos que estejam disponíveis em determinada data escolhida.



## Documentação da API

### Pacientes
#### Cadastrar um novo paciente

```http
  POST /api/pacientes
```
Parâmetros abaixo são para especificar os dados que deve conter no body json

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `full_name` | `string` | **Obrigatório**. O nome completo do Paciente é obrigatório |
| `gender` | `ENUM` | O genêro deve ser uma dentre essas opções: FEMININO, MASCULINO ou OUTRO |
| `birth_date` | `DATEONLY` | **Obrigatório**. A data de nascimento é obrigatória e deve ser uma data válida |
| `cpf` | `string` | **Obrigatório**. O cpf do paciente deve conter apenas números e ter 11 dígitos além disso é obrigatório e unico | 
| `phone_number` | `string` | O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX |
| `emergency_contact` | `string` | **Obrigatório**. O contato de emergência é obrigatório e deve conter apenas letras e espaços  |
| `allergies_list` | `string` | Alergias que o paciente pode ter com relação a algum medicamento ou alimentos |
| `specific_care_list` | `string` | Cuidados Específicos com o paciente |
| `health_insurance_plan` | `string` | Convênio médico do paciente  |
| `attendance_status` | `ENUM` | O status de atendimento deve ser uma dessas opções AGUARDANDO_ATENDIMENTO, EM_ATENDIMENTO, ATENDIDO ou NAO_ATENDIDO |
| `total_attendances` | `INTEGER` | Total de atendimentos realizados não é necessário passar na requisição, por padrão ele inicia em 0 e vai ser incrementado na rota de atendimentos médicos |

#### Exemplo de requisição

```json
{
	"full_name": "Fernando",
	"gender": "MASCULINO",
	"birth_date": "1999-12-22",
	"cpf": "13344422213",
	"phone_number": "(44) 98879-7659",
	"emergency_contact": "Ricardo",
	"allergies_list": "Paracetamol",
	"specific_care_list": "Intolerante a lactose",
	"health_insurance_plan": "Unimed",
	"attendance_status": "AGUARDANDO_ATENDIMENTO"
}
```

#### Exemplo de resposta

```json
{
	"total_attendances": 0,
	"id": 3,
	"full_name": "Fernando",
	"gender": "MASCULINO",
	"birth_date": "1999-12-22",
	"cpf": "13344422213",
	"phone_number": "(44) 98879-7659",
	"emergency_contact": "Ricardo",
	"allergies_list": "Paracetamol",
	"specific_care_list": "Intolerante a lactose",
	"health_insurance_plan": "Unimed",
	"attendance_status": "AGUARDANDO_ATENDIMENTO",
	"updatedAt": "2023-04-14T07:32:24.368Z",
	"createdAt": "2023-04-14T07:32:24.368Z"
}
```

#### Atualizar um paciente

```http
  PUT /api/pacientes/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para atualizar o paciente.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do paciente que você quer atualizar|

> Pode ser atualizado qualquer parâmetro de paciente não precisa ter todos parâmetros para atualizar, mas caso queira atualizar algum deve passar o dado conforme solicitado.

#### Exemplo de requisição

```json
{
	"emergency_contact": "Maria",
	
}
```

#### Exemplo de resposta

```json
{
	"total_attendances": 0,
	"id": 3,
	"full_name": "Fernando",
	"gender": "MASCULINO",
	"birth_date": "1999-12-22",
	"cpf": "13344422213",
	"phone_number": "(44) 98879-7659",
	"emergency_contact": "Maria",
	"allergies_list": "Paracetamol",
	"specific_care_list": "Intolerante a lactose",
	"health_insurance_plan": "Unimed",
	"attendance_status": "AGUARDANDO_ATENDIMENTO",
	"updatedAt": "2023-04-14T07:32:24.368Z",
	"createdAt": "2023-04-14T07:32:24.368Z"
}
```

#### Exemplo de erro na requisição

```json
{
	"cpf": "Mercadinhos"
}
```
#### Exemplo de resposta do erro

```json
[
	{
		"field": "cpf",
		"message": "O CPF deve conter apenas números e ter 11 dígitos"
	}
]
```
#### Atualizar o status de paciente

```http
  PUT /api/pacientes/${id}/status
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para atualizar o status do paciente.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do paciente que você quer atualizar o status|


Parâmetro abaixo é para exemplificar o que precisa ser enviado no Body params como json

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `attendance_status` | `ENUM` | O status de atendimento deve ser uma dessas opções AGUARDANDO_ATENDIMENTO, EM_ATENDIMENTO, ATENDIDO ou NAO_ATENDIDO |

#### Exemplo de requisição

```json
{
	"attendance_status": "EM_ATENDIMENTO"
}
```

#### Exemplo de resposta

```json
{
	"id": 1,
	"full_name": "João",
	"gender": "MASCULINO",
	"birth_date": "1999-10-02",
	"cpf": "66666666666",
	"phone_number": "(44) 99559-3466",
	"emergency_contact": "Maria",
	"allergies_list": "Dipirona",
	"specific_care_list": "",
	"health_insurance_plan": "",
	"attendance_status": "EM_ATENDIMENTO",
	"total_attendances": 0,
	"createdAt": "2023-04-13T19:54:46.731Z",
	"updatedAt": "2023-04-19T01:19:26.499Z"
}
```

#### Exemplo de erro na requisição

```json
{
	"attendance_status": ""
}
```
#### Exemplo de resposta do erro

```json
[
	{
		"field": "attendance_status",
		"message": "O status de atendimento deve ser AGUARDANDO_ATENDIMENTO, EM_ATENDIMENTO, ATENDIDO ou NAO_ATENDIDO"
	}
]
```

#### Listar todos os paciente com ou sem filtro pelo status

```http
  GET /api/pacientes
```
> Esta rota tem como opcional o filtro pelo status do paciente passado como query params como no exemplo abaixo: 

![Exemplo query params](https://i.imgur.com/eJ7X0Ri.png)

#### Exemplo de resposta sem o uso do query params

```json
[
	{
		"id": 1,
		"full_name": "João",
		"gender": "MASCULINO",
		"birth_date": "1999-10-02",
		"cpf": "66666666666",
		"phone_number": "(44) 99559-3466",
		"emergency_contact": "Maria",
		"allergies_list": "Dipirona",
		"specific_care_list": "",
		"health_insurance_plan": "",
		"attendance_status": "AGUARDANDO_ATENDIMENTO",
		"total_attendances": 0,
		"createdAt": "2023-04-13T19:54:46.731Z",
		"updatedAt": "2023-04-13T19:54:46.731Z"
	},
	{
		"id": 2,
		"full_name": "Maria",
		"gender": "FEMININO",
		"birth_date": "1999-10-02",
		"cpf": "22222222222",
		"phone_number": "(44) 99859-7756",
		"emergency_contact": "Joao",
		"allergies_list": "Dipirona",
		"specific_care_list": "",
		"health_insurance_plan": "",
		"attendance_status": "ATENDIDO",
		"total_attendances": 4,
		"createdAt": "2023-04-13T20:32:51.509Z",
		"updatedAt": "2023-04-19T01:11:25.349Z"
	}
]
```

#### Exemplo de resposta com o uso do query params

```json
[
	{
		"id": 1,
		"full_name": "João",
		"gender": "MASCULINO",
		"birth_date": "1999-10-02",
		"cpf": "66666666666",
		"phone_number": "(44) 99559-3466",
		"emergency_contact": "Maria",
		"allergies_list": "Dipirona",
		"specific_care_list": "",
		"health_insurance_plan": "",
		"attendance_status": "AGUARDANDO_ATENDIMENTO",
		"total_attendances": 0,
		"createdAt": "2023-04-13T19:54:46.731Z",
		"updatedAt": "2023-04-19T01:20:29.763Z"
	}
]
```

#### Listar paciente pelo identificador

```http
  GET /api/pacientes/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para listar o paciente especifico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do paciente que você quer listar |

#### Exemplo de resposta

```json
{
	"id": 2,
	"full_name": "Maria",
	"gender": "FEMININO",
	"birth_date": "1999-10-02",
	"cpf": "22222222222",
	"phone_number": "(44) 99859-7756",
	"emergency_contact": "Joao",
	"allergies_list": "Dipirona",
	"specific_care_list": "",
	"health_insurance_plan": "",
	"attendance_status": "EM_ATENDIMENTO",
	"total_attendances": 0,
	"createdAt": "2023-04-13T20:32:51.509Z",
	"updatedAt": "2023-04-14T06:31:40.530Z"
}
```

#### Deletar um paciente

```http
  DELETE /api/pacientes/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para deletar o paciente especifico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do paciente que você quer deletar |


> Rota de deleção do paciente, quando ocorre com sucesso status 204 sem conteudo de resposta.

> Caso ocorra um erro como por exemplo de passar o id de um paciente que não existe mensagem que é retornada:

```json
{
	"message": "Paciente não encontrado."
}
```

### Médicos

#### Cadastrar um novo médico

```http
  POST /api/medicos
```
Parâmetros abaixo são para especificar os dados que deve conter no body json

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `full_name` | `string` | **Obrigatório**. O nome completo do médico é obrigatório |
| `gender` | `ENUM` | O genêro deve ser uma dentre essas opções: FEMININO, MASCULINO ou OUTRO |
| `birth_date` | `DATEONLY` | **Obrigatório**. A data de nascimento é obrigatória e deve ser uma data válida |
| `cpf` | `string` | **Obrigatório**. O cpf do médico deve conter apenas números e ter 11 dígitos além disso é obrigatório e unico | 
| `phone_number` | `string` | O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX |
| `education_institution` | `string` | **Obrigatório**. A instituição de ensino da formação é obrigatória e deve conter apenas letras e espaços  |
| `crm_uf` | `string` | **Obrigatório**. O cadastro do CRM/UF é obrigatório |
| `clinical_specialization` | `ENUM` | **Obrigatório**. A especialização clínica é obrigatória e deve ser uma dessas opções: CLINICO_GERAL, ANESTESISTA, DERMATOLOGIA, GINECOLOGIA, NEUROLOGIA, PEDIATRIA, PSIQUIATRIA, ORTOPEDIA |
| `status` | `ENUM` | O estado do médico no sistema deve ser ATIVO ou INATIVO |
| `total_attendances` | `INTEGER` | Total de atendimentos realizados não é necessário passar na requisição, por padrão ele inicia em 0 e vai ser incrementado na rota de atendimentos médicos |

#### Exemplo de requisição

```json
{
	"full_name": "Gabriel",
	"gender": "MASCULINO",
	"birth_date": "1996-06-06",
	"cpf": "23332155566",
	"phone_number": "(48) 99886-4584",
	"education_institution": "UFSC",
	"crm_uf": "CRM/SC 666666",
	"clinical_specialization": "NEUROLOGIA",
	"status": "ATIVO"
}
```

#### Exemplo de resposta

```json
{
	"total_attendances": 0,
	"id": 3,
	"full_name": "Gabriel",
	"gender": "MASCULINO",
	"birth_date": "1996-06-06",
	"cpf": "23332155566",
	"phone_number": "(48) 99886-4584",
	"education_institution": "UFSC",
	"crm_uf": "CRM/SC 666666",
	"clinical_specialization": "NEUROLOGIA",
	"status": "ATIVO",
	"updatedAt": "2023-04-15T05:42:30.252Z",
	"createdAt": "2023-04-15T05:42:30.252Z"
}
```

#### Atualizar um médico

```http
  PUT /api/medicos/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para atualizar o médico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do médico que você quer atualizar|

> Pode ser atualizado qualquer parâmetro de médico, não precisa ter todos parâmetros para atualizar, mas todo dado que for atualizado deve ser passado corretamente conforme solicitado.

#### Exemplo de requisição

```json
{
	"full_name": "Italo"
}
```

#### Exemplo de resposta

```json
{
	"id": 1,
	"full_name": "Italo",
	"gender": "MASCULINO",
	"birth_date": "1986-08-27",
	"cpf": "77789899900",
	"phone_number": "(44) 98832-7056",
	"education_institution": "USP",
	"crm_uf": "CRM/SP 123456",
	"clinical_specialization": "ORTOPEDIA",
	"status": "ATIVO",
	"total_attendances": 0,
	"createdAt": "2023-04-15T00:48:25.534Z",
	"updatedAt": "2023-04-15T04:05:04.501Z"
}
```

#### Exemplo de erro na requisição

```json
{
	"full_name": "123"
}
```
#### Exemplo de resposta do erro

```json
[
	{
		"field": "full_name",
		"message": "O nome completo deve conter apenas letras e espaços"
	}
]
```
#### Atualizar o status de médico

```http
  PUT /api/medicos/${id}/status
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para atualizar o status do médico no sistema.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do médico que você quer atualizar o status |


Parâmetro abaixo é para exemplificar o que precisa ser enviado no Body params como json

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `ENUM` | O estado do médico no sistema deve ser ATIVO ou INATIVO |

#### Exemplo de requisição

```json
{
	"status": "INATIVO"
}
```

#### Exemplo de resposta

```json
{
	"id": 1,
	"full_name": "Italo",
	"gender": "MASCULINO",
	"birth_date": "1986-08-27",
	"cpf": "77789899900",
	"phone_number": "(44) 98832-7056",
	"education_institution": "USP",
	"crm_uf": "CRM/SP 123456",
	"clinical_specialization": "ORTOPEDIA",
	"status": "INATIVO",
	"total_attendances": 0,
	"createdAt": "2023-04-15T00:48:25.534Z",
	"updatedAt": "2023-04-15T04:46:41.453Z"
}
```

#### Exemplo de erro na requisição

```json
{
	"status": ""
}
```
#### Exemplo de resposta do erro

```json
[
	{
		"field": "status",
		"message": "O estado do médico no sistema deve ser ATIVO ou INATIVO"
	}
]
```

#### Listar todos os médicos com ou sem filtro pelo status

```http
  GET /api/medicos
```
> Esta rota tem como opcional o filtro pelo status do médico passado como query params como no exemplo abaixo: 

![Exemplo query params](https://i.imgur.com/iVpIOSr.png)

#### Exemplo de resposta sem o uso do query params

```json
[
	{
		"id": 2,
		"full_name": "Ricardo",
		"gender": "MASCULINO",
		"birth_date": "1976-09-05",
		"cpf": "14456788897",
		"phone_number": "(48) 98866-7794",
		"education_institution": "UFSC",
		"crm_uf": "CRM/SC 321654",
		"clinical_specialization": "DERMATOLOGIA",
		"status": "ATIVO",
		"total_attendances": 0,
		"createdAt": "2023-04-15T05:28:22.551Z",
		"updatedAt": "2023-04-15T05:28:22.551Z"
	},
	{
		"id": 1,
		"full_name": "Italo",
		"gender": "MASCULINO",
		"birth_date": "1986-08-27",
		"cpf": "77789899900",
		"phone_number": "(44) 98832-7056",
		"education_institution": "USP",
		"crm_uf": "CRM/SP 123456",
		"clinical_specialization": "ORTOPEDIA",
		"status": "INATIVO",
		"total_attendances": 5,
		"createdAt": "2023-04-15T00:48:25.534Z",
		"updatedAt": "2023-04-19T03:01:55.808Z"
	}
]
```

#### Exemplo de resposta com o uso do query params

```json
[
	{
		"id": 2,
		"full_name": "Ricardo",
		"gender": "MASCULINO",
		"birth_date": "1976-09-05",
		"cpf": "14456788897",
		"phone_number": "(48) 98866-7794",
		"education_institution": "UFSC",
		"crm_uf": "CRM/SC 321654",
		"clinical_specialization": "DERMATOLOGIA",
		"status": "ATIVO",
		"total_attendances": 0,
		"createdAt": "2023-04-15T05:28:22.551Z",
		"updatedAt": "2023-04-15T05:28:22.551Z"
	}
]
```

#### Listar médico pelo identificador

```http
  GET /api/medicos/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para listar o médico especifico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do médico que você quer listar |

#### Exemplo de resposta

```json
{
	"id": 2,
	"full_name": "Ricardo",
	"gender": "MASCULINO",
	"birth_date": "1976-09-05",
	"cpf": "14456788897",
	"phone_number": "(48) 98866-7794",
	"education_institution": "UFSC",
	"crm_uf": "CRM/SC 321654",
	"clinical_specialization": "DERMATOLOGIA",
	"status": "ATIVO",
	"total_attendances": 0,
	"createdAt": "2023-04-15T05:28:22.551Z",
	"updatedAt": "2023-04-15T05:28:22.551Z"
}
```

#### Deletar um médico

```http
  DELETE /api/medicos/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para deletar o médico especifico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do médico que você quer deletar |


> Rota de deleção do médico, quando ocorre com sucesso status 204 sem conteudo de resposta.

> Caso ocorra um erro como por exemplo de passar o id de um médico que não existe mensagem que é retornada:

```json
{
	"message": "Médico(a) não foi encontrado(a)"
}
```

### Enfermeiros

#### Cadastrar um novo enfermeiro

```http
  POST /api/enfermeiros
```
Parâmetros abaixo são para especificar os dados que deve conter no body json

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `full_name` | `string` | **Obrigatório**. O nome completo do enfermeiro é obrigatório e deve conter apenas letras e espaços |
| `gender` | `ENUM` | O genêro deve ser uma dentre essas opções: FEMININO, MASCULINO ou OUTRO |
| `birth_date` | `DATEONLY` | **Obrigatório**. A data de nascimento é obrigatória e deve ser uma data válida |
| `cpf` | `string` | **Obrigatório**. O cpf do enfermeiro deve conter apenas números e ter 11 dígitos além disso é obrigatório e unico | 
| `phone_number` | `string` | O número de telefone deve ter o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX |
| `education_institution` | `string` | **Obrigatório**. A instituição de ensino da formação é obrigatória e deve conter apenas letras e espaços |
| `cofen_uf` | `string` | **Obrigatório**. O campo cofen/uf é obrigatório e deve estar no formato **UF1234567890** |

#### Exemplo de requisição

```json
{
	"full_name": "Joana pereira",
	"gender": "FEMININO",
	"birth_date": "1985-05-23",
	"cpf": "00507934422",
	"phone_number": "(48) 99975-1246",
	"education_institution": "ESTACIO",
	"cofen_uf": "SC3446667854"
}
```

#### Exemplo de resposta

```json
{
	"id": 3,
	"full_name": "Joana pereira",
	"gender": "FEMININO",
	"birth_date": "1985-05-23",
	"cpf": "00507934422",
	"phone_number": "(48) 99975-1246",
	"education_institution": "ESTACIO",
	"cofen_uf": "SC3446667854",
	"updatedAt": "2023-04-16T03:36:25.626Z",
	"createdAt": "2023-04-16T03:36:25.626Z"
}
```

#### Atualizar um enfermeiro

```http
  PUT /api/enfermeiros/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para atualizar o enfermeiro.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do enfermeiro que você quer atualizar|

> Pode ser atualizado qualquer parâmetro de enfermeiro, não precisa ter todos parâmetros para atualizar, mas todo dado que for atualizado deve ser passado corretamente conforme solicitado.

#### Exemplo de requisição

```json
{
	"full_name": "Pedro José Pereira"
}
```

#### Exemplo de resposta

```json
{
	"id": 1,
	"full_name": "Pedro José Pereira",
	"gender": "MASCULINO",
	"birth_date": "2000-11-14",
	"cpf": "14532147680",
	"phone_number": "(48) 99677-9320",
	"education_institution": "ESTACIO",
	"cofen_uf": "SP1234567890",
	"createdAt": "2023-04-15T21:43:21.567Z",
	"updatedAt": "2023-04-15T22:11:02.283Z"
}
```

#### Exemplo de erro na requisição

```json
{
	"full_name": "1234"
}
```
#### Exemplo de resposta do erro

```json
[
	{
		"field": "full_name",
		"message": "O nome completo deve conter apenas letras e espaços"
	}
]
```

#### Listar todos os enfermeiros

```http
  GET /api/enfermeiros
```

#### Exemplo de resposta sem o uso do query params

```json
[
	{
		"id": 1,
		"full_name": "Pedro José Pereira",
		"gender": "MASCULINO",
		"birth_date": "2000-11-14",
		"cpf": "14532147680",
		"phone_number": "(48) 99677-9320",
		"education_institution": "ESTACIO",
		"cofen_uf": "SP1234567890",
		"createdAt": "2023-04-15T21:43:21.567Z",
		"updatedAt": "2023-04-15T22:11:02.283Z"
	},
	{
		"id": 2,
		"full_name": "Henrique dos Santos",
		"gender": "MASCULINO",
		"birth_date": "1995-03-29",
		"cpf": "00306789944",
		"phone_number": "(48) 99684-3506",
		"education_institution": "UNIASSELVI",
		"cofen_uf": "SC3216549872",
		"createdAt": "2023-04-16T03:23:50.967Z",
		"updatedAt": "2023-04-16T03:23:50.967Z"
	}
]
```

#### Listar enfermeiro pelo identificador

```http
  GET /api/enfermeiros/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para listar o enfermeiro especifico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do enfermeiro que você quer listar |

#### Exemplo de resposta

```json
{
	"id": 2,
	"full_name": "Henrique dos Santos",
	"gender": "MASCULINO",
	"birth_date": "1995-03-29",
	"cpf": "00306789944",
	"phone_number": "(48) 99684-3506",
	"education_institution": "UNIASSELVI",
	"cofen_uf": "SC3216549872",
	"createdAt": "2023-04-16T03:23:50.967Z",
	"updatedAt": "2023-04-16T03:23:50.967Z"
}
```

#### Deletar um enfermeiro

```http
  DELETE /api/enfermeiros/${id}
```
Parâmetro abaixo é o id que é necessário ser passado como Route Params na rota para deletar o enfermeiro especifico.

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. O ID do enfermeiro que você quer deletar |


> Rota de deleção do enfermeiro, quando ocorre com sucesso status 204 sem conteudo de resposta.

> Caso ocorra um erro como por exemplo de passar o id de um enfermeiro que não existe mensagem que é retornada:

```json
{
	"message": "Este Enfermeiro(a) não foi encontrado(a)"
}
```

### **Atendimentos**
#### Rota de Atendimentos

```http
  POST /api/atendimentos
```
> Nesta rota deve ser passado no body params o id de paciente e o id de médico que fez o atendimento, após enviado é mostrado na resposta o atendimento, o paciente com o total de atendimentos incrementado e o médico com o total de atendimentos incrementado.

#### Exemplo de requisição

```json
{
	"patient_id": 2,
	"doctor_id": 1
}
```

#### Exemplo de resposta

```json
{
	"medic_attendance": {
		"id": 4,
		"patient_id": 2,
		"doctor_id": 1,
		"updatedAt": "2023-04-19T03:01:55.814Z",
		"createdAt": "2023-04-19T03:01:55.814Z"
	},
	"patient": {
		"id": 2,
		"full_name": "Maria",
		"gender": "FEMININO",
		"birth_date": "1999-10-02",
		"cpf": "22222222222",
		"phone_number": "(44) 99859-7756",
		"emergency_contact": "Joao",
		"allergies_list": "Dipirona",
		"specific_care_list": "",
		"health_insurance_plan": "",
		"attendance_status": "ATENDIDO",
		"total_attendances": 5,
		"createdAt": "2023-04-13T20:32:51.509Z",
		"updatedAt": "2023-04-19T03:01:55.779Z"
	},
	"doctor": {
		"id": 1,
		"full_name": "Italo",
		"gender": "MASCULINO",
		"birth_date": "1986-08-27",
		"cpf": "77789899900",
		"phone_number": "(44) 98832-7056",
		"education_institution": "USP",
		"crm_uf": "CRM/SP 123456",
		"clinical_specialization": "ORTOPEDIA",
		"status": "INATIVO",
		"total_attendances": 5,
		"createdAt": "2023-04-15T00:48:25.534Z",
		"updatedAt": "2023-04-19T03:01:55.808Z"
	}
}
```

