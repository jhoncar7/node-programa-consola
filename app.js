//const { mostrarMenu, pausa } = require('./helpers/mensajes');

require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
    //uhhh
    let option = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareas(tareasDB);
    }

    do {
        option = await inquirerMenu();
        switch (option) {
            case '1'://crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2'://listar todas las tareas
                tareas.listadoCompleto();
                break;
            case '3'://listas completadas
                tareas.listarPendientesCompletadas();
                break;
            case '4'://listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.getListado);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //borrar
                const id = await listadoTareasBorrar(tareas.getListado);
                if (id !== '0') {
                    const confirmarBorrado = await confirmar('¿Esta Seguro 😥?') //Preguntar si se quiere borrar
                    if (confirmarBorrado) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
                break;
        }

        guardarDB(tareas.getListado);

        await pausa();
        console.clear();
    } while (option !== '0');
}

main();

/* const main = async () => {
    let option = '';
    do {
        option = await mostrarMenu();
        if (option !== '0') await pausa();
    } while (option !== '0');
} */