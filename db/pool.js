const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: "postgresql://hunyao:VVsbcmg2Km2@localhost:5432/odininventory"
});