
class Pais {
    id = '';
    name = '';
    abreviacion = '';

    constructor(id, name, desc) {
        this.id = id;
        this.name = name;
        this.abreviacion = desc;
    }
}

module.exports = Pais;