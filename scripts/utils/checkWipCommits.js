//Ensure package.json dependencies only have exact versions installed
const chalk = require('chalk')
const exec = require('child_process').exec

const exitWithError = err => {
  console.error(err.message)
  process.exit(1)
}

exec('git log --first-parent', (err, stdout, stderror) => {
  if (!err && !stderror) {
    const commits = stdout
      .split('commit')
      .filter(Boolean)
      .map(commit => `commit${commit}`)
    commits.forEach(commit => {
      if (
        commit.includes('WIP') ||
        commit.toLowerCase().includes('[wip]') ||
        commit.toLowerCase().includes('--wip--')
      ) {
        exitWithError(
          new Error(
            `${chalk.bold.red(
              'the following commit appears to be a WIP commit:'
            )}\n\n${chalk.white(commit)}${chalk.red(
              'Please resolve this commit before pushing to master'
            )}\n`
          )
        )
      }
    })
  } else {
    if (stderror) {
      exitWithError(new Error(stderror))
    } else {
      exitWithError(err)
    }
  }
})
