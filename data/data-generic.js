class Data {
    constructor(Model) {
        this.Model = Model;
    }
    orderByRam() {
        return this.Model.findAll({
            order: [
                ['ram', 'DESC'],
            ],
            attributes: ['model', 'ram'],
        });
    }

    selectByCamera(param) {
        return this.Model.findAll({
            where: {
                camera: param,
            },
        });
    }

    selectBySize(param) {
        return this.Model.findAll({
            where: {
                size: param,
            },
        });
    }
}

module.exports = Data;
