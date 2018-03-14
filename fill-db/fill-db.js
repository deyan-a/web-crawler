const _ = require('lodash');

const {
    getAllDevicesGA,
    getAllDevicesPA,
} = require('../extract-details/index');

const {
    Brand,
    Features,
    Webpage,
} = require('../models');

const getData = async () => {
    const phoneArenaData = await getAllDevicesPA();
    const gsmArenaData = await getAllDevicesGA();

    return _.flatten([phoneArenaData, gsmArenaData]);
};

const fillDb = async (obj) => {
    const phone = obj;

    await Webpage.findCreateFind({
        where: {
            name: phone.website,
        },
    });

    const brands = await Brand.findCreateFind({
        where: {
            name: phone.deviceBrand,
        },
    });

    await Features.create({
        model: phone.deviceModel,
        size: phone.deviceSize,
        camera: phone.deviceCamera,
        chipset: phone.deviceChipset,
        ram: phone.deviceRam,
        Battery: phone.deviceBattery,
        BrandId: brands[0].id,
    });
};

const iteratePhones = async () => {
    const data = await getData();
    await data.map((phone) => fillDb(phone));
};

// iteratePhones();

module.exports = {
    iteratePhones,
};
