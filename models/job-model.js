'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  team: String,
  jobId: String,
  title: String,
  description: String,
  createdAt: Date,
  deletedAt: Date,
  tags: [],
  applicants: [],
},
{ versionKey: false });

jobSchema.index(
  {
    title: 'text',
    description: 'text',
    tags: 'text',
  },

);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
