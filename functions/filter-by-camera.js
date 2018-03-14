const {
    features,
} = require('../data');

const filterByCamera = async (param) => {
    const result = await features.selectByCamera(param);

    result.forEach((phone) => {
        const modelLength = phone.model.length;
        const spaceBetween = 30 - modelLength;
        console.log(`model: ${phone.model}`
        + ' '.repeat(spaceBetween) + `camera: ${phone.camera}`);
    });
};

/* eslint-disable */
const params = process.argv[2];
/* eslint-enable */

filterByCamera(params);
