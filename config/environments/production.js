module.exports = {
  web: {
    port: process.env.PORT
  },
  logging: {
    appenders: {
      out: { type: "console" }
    },
    categories: {
      default: { appenders: ["out"], level: "info" }
    }
  }
};
