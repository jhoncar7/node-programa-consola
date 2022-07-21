
class Cuenta {
    Descripción = '';
    Cuenta = '';
    SubCta = '';

    constructor(desc, cuenta, subcta) {
        this.Descripción = desc;
        this.Cuenta = cuenta;
        this.SubCta = subcta;
    }
}

module.exports = Cuenta;