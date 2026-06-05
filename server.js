require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./src/database/database.js')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    const query = 'Select * from eventos';
    db.query(query, (error,resultados) => {
        if (error){
            console.error('Error al consultar', error);
            return;
        }
        res.json(resultados);
    })

});

app.listen(PORT, () => {
  console.log(`Tareas API ejecutándose en http://localhost:${PORT}`);;
});