const {
    features,
} = require('../data');

const orderByRam = async () => {
    const result = await features.orderByRam();
    result.forEach((phone) => {
        const modelLength = phone.model.length;
        const spaceBetween = 30 - modelLength;
        console.log(`model: ${phone.model}`
        + ' '.repeat(spaceBetween) + `RAM: ${phone.ram}`);
    });
};

orderByRam();
