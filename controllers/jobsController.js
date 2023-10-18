const express = require('express')
const router = express.Router()
const Job = require('../models/jobs')

const postJob = async (req, res) => {
  const {
    title,
    company,
    location,
    dateOfExpiration,
    websiteLink,
    answered,
    interviewed
  } = req.body

  try {
    const job = new Job({
      title,
      company,
      location,
      dateOfExpiration,
      websiteLink,
      answered,
      interviewed
    })

    await job.save()
    res.status(201).json({ message: 'Job posted successfully', job })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error posting job' })
  }
}

const getUserJobs = async (req, res) => {
  try {
    const userId = req.params.userId
    const jobs = await Job.find({ userId })
    res.status(200).json(jobs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching user jobs' })
  }
}

module.exports = {
  postJob,
  getUserJobs
}
