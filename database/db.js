require('dotenv').config();
const sql = require('mssql');

const dbSettings = {
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    server: process.env.DB_SERVER || "",
    database: process.env.DB_DATABASE || "",
    port: parseInt(process.env.DB_PORT) || "",
    trustServerCertificate: true,
    options: {
        encrypt: true
    }
};

const getConnection = async () => { 
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (_err) {
        console.error('Connecting database fail: ', _err);
    }
};

module.exports = {
    getConnection,
    sql
};
