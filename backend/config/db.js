const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'p3plzcpnl507573.prod.phx3.secureserver.net',
    user: process.env.DB_USER || 'l74786401iit',
    password: process.env.DB_PASSWORD || 'ExpertRubber2002$',
    database: process.env.DB_NAME || 'crud_react'
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
