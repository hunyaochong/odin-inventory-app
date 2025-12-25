require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://hunyao:VVsbcmg2Km2@localhost:5432/odininventory"
});