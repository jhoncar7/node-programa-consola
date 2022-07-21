const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desa hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Listar Cuentas y Subcuentas`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Paises`,
            },
            {
                value: '3',
                name: `${'3.'.green} Crear ADI por pais`,
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`,
            }
        ],

    }
]

const inquirerMenu = async () => {
    //console.clear();
    console.log('===================================='.green);
    console.log('Seleccione una opcion:'.white);
    console.log('====================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const pausa = async () => {
    await inquirer.prompt([{
        type: 'keypress',
        name: 'enter',
        message: `Pulse cualquier ${'tecla'.green} para continuar...`,
    }]);
}

const listadarPaisesCrearADI = async (listado = []) => {
    const choices = listado.map((lis, idx) => {
        return {
            value: lis.id,
            name: `${(idx + 1).toString().green}. ${lis.nombre}`,
        }
    })

    //agrega al principio de las opciones una opcion para salir
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione una opcion de la lista para borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm', //regresa un valor booleano
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        return {
            value: tarea.id,
            name: `${(idx + 1).toString().green}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione tareas a completar',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadarPaisesCrearADI,
    confirmar,
    mostrarListadoCheckList
}