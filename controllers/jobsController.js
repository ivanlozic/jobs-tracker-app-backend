const express = require('express')
const router = express.Router()
const Job = require('../models/jobs')
const User = require('../models/user')

const postJob = async (req, res) => {
  const {
    userId,
    title,
    company,
    location,
    dateOfExpiration,
    websiteLink,
    answered,
    interviewed
  } = req.body

  const id = userId

  try {
    const user = await User.findOne({ id })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const jobId = user.jobs.length + 1
    console.log(user, jobId)

    const job = new Job({
      jobId,
      title,
      company,
      location,
      dateOfExpiration,
      websiteLink,
      answered,
      interviewed
    })

    user.jobs.push(job)

    await user.save()

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

const editJob = async (req, res) => {
  if (req.method === 'PUT') {
    const jobId = req.query.id
    const { answered, interviewed } = req.body

    try {
      const updatedJob = await updateJob(jobId, { answered, interviewed })
      res.status(200).json(updatedJob)
    } catch (error) {
      console.error('Error updating job:', error)
      res.status(500).json({ message: 'Error updating job' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

module.exports = {
  postJob,
  getUserJobs,
  editJob
}
