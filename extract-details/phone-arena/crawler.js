const _ = require('lodash');

const {
    getPagesNumber,
    getAllPages,
} = require('../extract-pages');
const {
    getDevicesLinks,
} = require('../extract-devices-links');
const {
    getDeviceDetailsPA,
} = require('../extract-device-details');
const {
    phoneArena,
} = require('../../selectors/index');

const getAllDevicesLinks = async (pagesArray) => {
    const allDevicesLinks =
    [...await Promise.all(pagesArray.map(async (page) => {
        const links =
            await getDevicesLinks(page,
                phoneArena.homeUrl, phoneArena.deviceUrls);
        return links;
    }))];
    // console.log(_.flatten(allDevicesLinks));
    return _.flatten(allDevicesLinks);
};

const getFiveAtOnce = async (allLinks, allDevices) => {
    if (allLinks.length === 0) {
        return allDevices;
    }

    const queue = allLinks.splice(0, 5);

    allDevices.push(await Promise.all(queue.map((page) => {
        return getDeviceDetailsPA(page, phoneArena);
    })));

    // console.log(allDevices);
    return getFiveAtOnce(allLinks, allDevices);
};

const getAllDevicesPA = async () => {
    const allPages =
        await getAllPages(
            phoneArena.crawUrl, getPagesNumber, phoneArena.pageLinks);
    const allDevicesLinks = await getAllDevicesLinks(allPages);
    const allDevices = await getFiveAtOnce(allDevicesLinks, []);


    return _.flatten(allDevices);
};

// const run = async () => {
//     const allDevices = await getAllDevicesPA();
//     console.log(allDevices);
//     // console.log(allDevices);
// };

// run();

module.exports = {
    getAllDevicesPA,
};
