const {
    getAllDevicesGA,
} = require('./gsm-arena/crawler');
const {
    getAllDevicesPA,
} = require('./phone-arena/crawler');

module.exports = {
    getAllDevicesGA,
    getAllDevicesPA,
};
