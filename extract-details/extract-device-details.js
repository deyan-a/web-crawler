const domParser = require('../dom-parser/dom-parser');
// const {
//     phoneArena,
//     gsmArena,
// } = require('../selectors/index');

const getDeviceDetailsPA = async (url, selector) => {
    const $ = await domParser.init(url);
    const deviceModelSelector = $(selector.deviceModel).html() || 'N/A';
    const deviceSizeSelector = $(selector.physicalSize).html() || 'N/A';
    const deviceCameraSelector = $(selector.camera).html() || 'N/A';
    const deviceChipsetSelector = $(selector.chipset).html() || 'N/A';
    const deviceBatterySelector = $(selector.batteryCapacity).html() || 'N/A';
    const brandAndModel = deviceModelSelector.split(' ');
    const [deviceBrand, ...deviceModel] = brandAndModel;
    let deviceRamSelector = $(selector.ram).html().split(' ').map(Number)[0];
    if (deviceRamSelector > 90) {
        deviceRamSelector /= 1000;
    }

    const newDevice = {
        website: selector.website,
        deviceBrand,
        deviceModel: deviceModel.join(' '),
        deviceSize: deviceSizeSelector
            .substring(0, deviceSizeSelector.indexOf('"'))
            .trim() || 'N/A',
        deviceCamera: deviceCameraSelector
            .substring(0, deviceCameraSelector.indexOf('MP'))
            .trim() || 'N/A',
        deviceChipset: deviceChipsetSelector
            .substring(0, deviceChipsetSelector.indexOf('<br>'))
            .trim() || 'N/A',
        deviceRam: deviceRamSelector || 'N/A',
        deviceBattery: deviceBatterySelector.split(' ')[0] || 'N/A',
    };

    return newDevice;
};

const getDeviceDetailsGA = async (url, selector) => {
    const $ = await domParser.init(url);
    const deviceModelSelector = $(selector.deviceModel).html() || 'N/A';
    const deviceSizeSelector = $(selector.physicalSize).html() || 'N/A';
    const deviceCameraSelector = $(selector.camera).html() || 'N/A';
    const deviceChipsetSelector = $(selector.chipset).html() || 'N/A';
    const brandAndModel = deviceModelSelector.split(' ');
    const [deviceBrand, ...deviceModel] = brandAndModel;
    let deviceRamSelector = $(selector.ram).html();
    if (deviceRamSelector > 90) {
        deviceRamSelector /= 1000;
    }
    const newDevice = {
        website: selector.website,
        deviceBrand,
        deviceModel: deviceModel.join(' '),
        deviceSize: deviceSizeSelector
            .substring(0, deviceSizeSelector.indexOf('inches'))
            .trim() || 'N/A',
        deviceCamera: deviceCameraSelector
            .substring(0, deviceCameraSelector.indexOf('MP'))
            .trim() || 'N/A',
        deviceChipset: deviceChipsetSelector
            .substring(0, deviceChipsetSelector.indexOf('<br>'))
            .trim() || 'N/A',
        deviceRam: deviceRamSelector || 'N/A',
        deviceBattery: $(selector.batteryCapacity).html() || 'N/A',
    };

    return newDevice;
};


// const run = async () => {
//     // const device = await getDeviceDetailsGA('https://www.gsmarena.com/samsung_galaxy_s8-8161.php', gsmArena);
//     const device = await getDeviceDetailsPA('https://www.phonearena.com/phones/Samsung-Galaxy-A8-2018_id10737', phoneArena);
//     console.log(device);
// };

// run();

module.exports = {
    getDeviceDetailsPA,
    getDeviceDetailsGA,
};
