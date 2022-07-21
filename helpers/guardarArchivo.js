const fs = require('fs');
const xlsx = require('xlsx');

const transformacion = './db/grupos.json';
const archivoExcelCrear = './db/ADIS/adis.xlsx';


const guardarDB = (data) => {
    fs.writeFileSync(transformacion, JSON.stringify(data));
}

const leerDB = (name) => {
    try {
        const info = fs.readFileSync(`./db/${name}`, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        return data;
    } catch (error) {
        return null;
    }
}

const leerGuardarExcel = (pais, cuentas) => {
    try {

        const excel = xlsx.readFile(`./db/ArchivosPaises/${pais}.xlsx`); // obtengo el archivo de la ruta
        const dataExcel = xlsx.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]]); // obtengo un arreglo con los datos de la hoja
        const result = limpiezaDatos(dataExcel, cuentas);
        guardarDBexcelXlsx(result, pais);
    } catch (error) {
        console.log(error);
    }
}

const guardarDBexcelXlsx = (data, pais) => {
    let workBook;
    const workSheet = xlsx.utils.json_to_sheet(data);
    if (fs.existsSync(archivoExcelCrear))
        workBook = xlsx.readFile(archivoExcelCrear);
    else
        workBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workBook, workSheet, pais);
    xlsx.writeFile(workBook, archivoExcelCrear, { bookType: 'xlsx', type: 'buffer' });
}

const limpiezaDatos = (data, cuentas) => {

    const d = [data[0], data[4], data[5]];
    let vec = [];
    let title = '';
    d.forEach(element => {

        let title = '';

        Object.keys(element).forEach(key => {
            if (key === '__EMPTY') {
                title = element[key];
            }

            if (element[key] !== 0 && key !== '__EMPTY') {

                const value = element[key];
                const name = key.includes('\r\n') ? key.replace('\r\n', '') : key;
                vec.push({
                    'title1': title,
                    'title2': name,
                    'Mercado': 113,
                    'Compañia': '001',
                    'Ce.Co': 'Nose',
                    'Proyecto': '000000',
                    'Cuenta': cuentas[name].Cuenta,
                    'SubCuenta': cuentas[name].SubCta,
                    '31Q': value
                });
            }
        });
    });
    return vec;
}

module.exports = {
    guardarDB,
    leerDB,
    leerGuardarExcel
}