import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
  subject: String,
  patient: { name: String, surname: String, phone: Number, email: String },
  startDate: String,
  endDate: String,
  comments: String,
});

const Appointment = model('Appointments', appointmentSchema, 'appointments');

export default Appointment;
