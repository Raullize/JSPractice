module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'admin',
  password: 'admin',
  database: 'bankaccounts',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
