import container from './container'

const app = container.resolve('app')

app.start().catch(error => {
  app.logger.error(error.stack)
  process.exit()
})

// terminate the Node.js process with a non-zero exit code.
process.on('SIGINT', async () => {
  await app.stop()
  // Dispose container when the server closes.
  container.dispose()
  process.exit(0)
})
