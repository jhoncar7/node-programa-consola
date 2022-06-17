const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareas(listado = []) {
        listado.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    get getListado() {
        const listado = [];
        //devuvle todos las llaves principales del arreglo
        Object.keys(this._listado).forEach((id) => {
            listado.push(this._listado[id]);
        })

        return listado;
    }

    listadoCompleto() {
        console.log();
        this.getListado.forEach((tarea, index) => {
            const idx = `${index + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.getListado.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? `${completadoEn}`.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            }

        })
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {

        ids.forEach((id) => {
            if (!this._listado[id].completadoEn) {
                this._listado[id].completadoEn = new Date();
            }
        })

        this.getListado.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;