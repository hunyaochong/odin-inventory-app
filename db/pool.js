const { Pool } = require("pg");

// For local development, try to load .env file
if (process.env.NODE_ENV !== 'production') {
    try {
        require("dotenv").config();
    } catch (err) {
        // dotenv might not be available, that's okay
    }
}

const connectionString = process.env.DATABASE_URL || "postgresql://hunyao:VVsbcmg2Km2@localhost:5432/odininventory";
console.log("=== DATABASE CONNECTION DEBUG ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL found:", process.env.DATABASE_URL ? "YES" : "NO");
console.log("Using connection:", connectionString.replace(/:[^:@]*@/, ":****@"));
console.log("================================");

module.exports = new Pool({
    connectionString: connectionString
});