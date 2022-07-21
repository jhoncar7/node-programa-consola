const Pais = require('./pais');

class Paises {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    /* crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    } */

    cargarPaises(listado = []) {
        listado.forEach((pais) => {
            this._listado[pais.id] = pais;
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
        this.getListado.forEach((pais, index) => {
            const idx = `${index + 1}`.green;
            const { nombre } = pais;
            console.log(`${idx} ${nombre}`);
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

    getPais(id) {
        if (this._listado[id])
            return this._listado[id];
        return null;
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

module.exports = Paises;