// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cozyspikeydrive', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define Mongoose Schema for Appointments
const AppointmentSchema = new mongoose.Schema({
    name: String,
    appointment: String,
    carModel: String,
    date: String,
    status: { type: String, default: 'Pending' }
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);

// API Route to Schedule an Appointment
app.post('/appointments', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment Created', appointment: newAppointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API Route to Get All Appointments
app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
