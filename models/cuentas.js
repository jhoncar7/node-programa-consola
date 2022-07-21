const Pais = require('./cuenta');

class Cuentas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    /* crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    } */

    cargarCuentas(listado = []) {
        listado.forEach((cuenta) => {
            this._listado[cuenta.Descripción] = cuenta;
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

    get getListadoOrigin() {
        return this._listado;
    }

    listadoCompleto() {
        console.log('\tNombre\t\t'.yellow, 'Cuenta\t'.cyan, 'SubCuenta'.magenta);
        this.getListado.forEach((cuenta, index) => {
            const idx = `${index + 1}`.green;
            const { Descripción, Cuenta, SubCta } = cuenta;
            console.log(`${idx}.${Descripción}${'->'.green}  ${`${Cuenta}`.cyan}  ${`${SubCta}`.magenta}`);
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

module.exports = Cuentas;