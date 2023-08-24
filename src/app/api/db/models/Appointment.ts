import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
  subject: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: String,
  endDate: String,
  comments: String,
});

const Appointment = model('Appointment', appointmentSchema, 'appointments');

export default Appointment;
