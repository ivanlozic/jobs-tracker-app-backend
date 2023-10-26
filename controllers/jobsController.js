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
    const id = req.params.userId
    const user = await User.findOne({ id })
    const jobs = user.jobs
    res.status(200).json(jobs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching user jobs' })
  }
}

const editJob = async (req, res) => {
  try {
    const id = req.params.userId
    const updatedJob = req.body
    const user = await User.findOne({ id })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const jobIndex = user.jobs.findIndex(
      (singleJob) => singleJob.jobId === updatedJob.jobId
    )
    if (jobIndex === -1) {
      return res.status(404).json({ message: 'Job not found' })
    }

    user.jobs[jobIndex] = updatedJob

    await user.save()

    return res.status(200).json({ message: 'Job updated successfully' })
  } catch (error) {
    console.error('Error updating job:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteJob = async (req, res) => {
  try {
    const userId = req.params.userId
    const jobId = req.params.jobId

    const user = await User.findOne({ id: userId })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }


    console.log('jobId:', jobId);
    console.log('user.jobs:', user.jobs);
    const jobIndex = user.jobs.findIndex((job) => job.jobId == jobId);
    console.log('jobIndex:', jobIndex);

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' })
    }

    user.jobs.splice(jobIndex, 1)

    await user.save()

    return res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Error deleting job:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  postJob,
  getUserJobs,
  editJob,
  deleteJob
}
