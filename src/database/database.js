const { App } = require('@capacitor/app');
const mysql = require('mysql2')

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}
);

database.connect((error)=> {
    if(error){
        console.error('Error al conectar a la base de datos', error);
        return;
    }
    console.log('Se conecto a la base de datos');
}
);
module.exports = database;

