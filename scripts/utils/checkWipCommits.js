//Ensure package.json dependencies only have exact versions installed
const exec = require('child_process').exec
const assert = require('assert')

const handleGit = () =>
  new Promise((resolve, reject) => {
    exec('git log --first-parent', (err, stdout, stderror) => {
      if (!err && !stderror) {
        resolve(stdout.split('commit').filter(Boolean))
      } else {
        if (stderror) {
          return reject(new Error(stderror))
        }
        return reject(new Error(stderror))
      }
    })
  })

const checkCommits = async () => {
  let commits = []
  try {
    commits = await handleGit()
  } catch (err) {
    throw err
  }
  commits.forEach(commit => {
    assert(!commit.includes('WIP'), `Commit: "${commit}" should not be pushed!`)
  })
}

checkCommits()
