const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  jobId: { type: Number, required: true },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dateOfExpiration: {
    type: Date,
    required: true
  },
  websiteLink: {
    type: String,
    required: true
  },
  answered: {
    type: Boolean,
    required: true
  },
  interviewed: {
    type: Boolean,
    required: true
  }
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job
