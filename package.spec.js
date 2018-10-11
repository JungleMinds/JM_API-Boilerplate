describe('package', () => {
  it('should only have exact versions installed', () => {
    const packageJson = require('./package.json')
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
        expect(`${dep.name}: '${dep.version}' (${dep.type})`).not.toContain('^')
      })
  })
})
