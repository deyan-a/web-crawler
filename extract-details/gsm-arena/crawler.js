const _ = require('lodash');

const {
    getAllBrandsPagesGA,
} = require('../extract-pages');
const {
    getDevicesLinks,
} = require('../extract-devices-links.js');
const {
    getDeviceDetailsGA,
} = require('../extract-device-details');
const {
    gsmArena,
} = require('../../selectors/index');

const getAllDevicesLinks = async (pagesArray) => {
    const allDevicesLinks =
    [...await Promise.all(pagesArray.map(async (page) => {
        const links =
            await getDevicesLinks(page, gsmArena.homeUrl, gsmArena.deviceUrls);
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
        return getDeviceDetailsGA(page, gsmArena);
    })));

    // console.log(allDevices);

    return getFiveAtOnce(allLinks, allDevices);
};

const getAllDevicesGA = async () => {
    const allPages =
        await getAllBrandsPagesGA(gsmArena);
    const allDevicesLinks = await getAllDevicesLinks(allPages);
    const allDevices = await getFiveAtOnce(allDevicesLinks, []);

    return _.flatten(allDevices);
};

// const run = async () => {
//     const allDevices = await getAllDevicesGA();
//     console.log(allDevices);
//     // console.log(allDevices);
// };

// run();

module.exports = {
    getAllDevicesGA,
};
