const {
    features,
} = require('../data');

const filterBySize = async (param) => {
    const result = await features.selectBySize(param);

    result.forEach((phone) => {
        const modelLength = phone.model.length;
        const spaceBetween = 30 - modelLength;
        console.log(`model: ${phone.model}` +
        ' '.repeat(spaceBetween) + `size: ${phone.size}`);
    });
};

/* eslint-disable */
const params = process.argv[2];
/* eslint-enable */

filterBySize(params);
