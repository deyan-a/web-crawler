const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const init = async (url) => {
    const dom = await JSDOM.fromURL(url);
    return new Promise((resolve) => {
    const $ = $init(dom.window);
    // return $;
    resolve($);
    });
};

module.exports = {
    init,
};
