require('dotenv').config();

const express = require('express');
const connection = require('./src/database');

const patientRoutes = require('./src/routes/patients/patientRoutes');
const doctorRoutes = require('./src/routes/doctors/doctorRoutes');
const nurseRoutes = require('./src/routes/nurses/nurseRoutes');
const medicAttendanceRoute = require('./src/routes/medicAttendanceRoute');

const app = express();
app.use(express.json())

connection.sync({ alter: true });
console.log('Connection has been established successfully.');

app.use(patientRoutes);
app.use(doctorRoutes);
app.use(nurseRoutes);
app.use(medicAttendanceRoute);

const port = process.env.API_SERVER_PORT;
app.listen(port, ()=> {
    console.log(`Api online na porta: ${port}`);
});