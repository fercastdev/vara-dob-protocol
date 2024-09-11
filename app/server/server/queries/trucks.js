const { TRUCKS } = require("../mock_data/trucks");

const getTrucks = async () => {
  return TRUCKS;
};

module.exports = {
  getTrucks,
};