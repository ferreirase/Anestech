module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_DB || 'anestech',
  define: {
    timestamps: true,
    underscored: true,
    underscoreAll: true,
  },
};
