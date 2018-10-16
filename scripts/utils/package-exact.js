//Ensure package.json dependencies only have exact versions installed
const assert = require('assert')

const packageJson = require('../../package.json')
const formatDep = (name, type) => ({
  name,
  type,
  version: packageJson[type][name]
})

Object.keys(packageJson.dependencies)
  .map(name => formatDep(name, 'dependencies'))
  .concat(
    Object.keys(packageJson.devDependencies).map(name =>
      formatDep(name, 'devDependencies')
    )
  )
  .filter(dep => dep.version.charAt(0) === '^')
  .forEach(dep => {
    assert(
      !`${dep.name}: '${dep.version}' (${dep.type})`.includes('^'),
      `dependency ${dep.name} should have exact version installed`
    )
  })
