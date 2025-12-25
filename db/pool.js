require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgresql://hunyao:VVsbcmg2Km2@localhost:5432/odininventory";
console.log("DATABASE_URL found:", process.env.DATABASE_URL ? "YES" : "NO");
console.log("Using connection:", connectionString.replace(/:[^:@]*@/, ":****@")); // Hide password in logs

module.exports = new Pool({
    connectionString: connectionString
});