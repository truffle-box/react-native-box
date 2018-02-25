module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 470000 // Match any network id
    }
  }
};
