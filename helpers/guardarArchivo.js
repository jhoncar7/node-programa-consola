const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    try {
        /* if (!fs.readFileSync(archivo)) {return null} */
        const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        return data;
    } catch (error) {
        return null;
    }
}

module.exports = {
    guardarDB,
    leerDB
}