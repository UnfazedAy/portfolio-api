/* eslint-disable max-len */
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please add an image of the project'],
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true, // Prevent duplicate titles
    trim: true, // Trim whitespace
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  technologies: {
    type: [String],
    required: [true, 'Please add the technolgies used'],
  },
  websiteUrl: {
    type: String,
    required: [true, 'Please add link to your website or project'],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  githubUrl: {
    type: String,
    required: [true, 'Please add a GitHub URL or link to source code'],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
