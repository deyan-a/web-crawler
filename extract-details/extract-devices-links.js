const domParser = require('../dom-parser/dom-parser');

const getDevicesLinks = async (url, baseUrl, linkSelector) => {
    const $ = await domParser.init(url);

    const pageLinks = [...$(linkSelector)].map((link) => $(link))
        .map(($link) => baseUrl + $link.attr('href'));
    return [...pageLinks];
};

module.exports = {
    getDevicesLinks,
};
