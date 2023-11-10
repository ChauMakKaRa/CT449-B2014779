const config = {
  app: {
    port: process.env.PORT || 3004,
  },
  db: {
    uri: process.env.MONGODB_URL || "mongodb://localhost:27017/salescommic_database",
  },
};
module.exports = config;
