const fs = require('fs/promises');
const path = require('path');

const { submissionsFile } = require('./config');

async function readSubmissions() {
  try {
    const raw = await fs.readFile(submissionsFile, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function addSubmission(submission) {
  const submissions = await readSubmissions();
  submissions.push(submission);
  await fs.mkdir(path.dirname(submissionsFile), { recursive: true });
  await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
  return submission;
}

module.exports = { readSubmissions, addSubmission };
