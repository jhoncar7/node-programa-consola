//const { mostrarMenu, pausa } = require('./helpers/mensajes');

require('colors');
const { guardarDB, leerDB, leerGuardarExcel } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadarPaisesCrearADI, confirmar } = require('./helpers/inquirer');
const Paises = require('./models/paises');
const Cuentas = require('./models/cuentas');

const main = async () => {

    let option = '';

    const paises = new Paises();
    const cuentas = new Cuentas();

    const paisesDB = leerDB('paises.json');
    const cuentasDB = leerDB('cuentas.json');

    if (paisesDB && cuentasDB) {
        paises.cargarPaises(paisesDB);
        cuentas.cargarCuentas(cuentasDB);
    }

    do {

        option = await inquirerMenu();

        switch (option) {
            case '1':
                cuentas.listadoCompleto();
                break;
            case '2':
                paises.listadoCompleto();
                break;
            case '3':
                const id = await listadarPaisesCrearADI(paises.getListado);
                if (id !== '0') {
                    const confirmarADI = await confirmar('¿Realizar ADI?') //Preguntar si se quiere crear ADI
                    if (confirmarADI) {
                        leerGuardarExcel(paises.getPais(id).nombre, cuentas.getListadoOrigin);
                        console.log('Realizado ADI'.green);
                    }
                }
                break;
        }

        //guardarDB(tareas.getListado);

        await pausa();
        console.clear();
    } while (option !== '0');
}

main();
