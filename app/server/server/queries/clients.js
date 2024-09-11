const { CLIENTS } = require("../mock_data/clients");

const getClients = async () => {
  return CLIENTS;
};

module.exports = {
  getClients,
};