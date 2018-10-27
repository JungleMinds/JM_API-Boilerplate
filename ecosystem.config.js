module.exports = {
  apps: [
    {
      name: 'API',
      script: './scripts/start.js',
      instances: 4,
      merge_logs: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
