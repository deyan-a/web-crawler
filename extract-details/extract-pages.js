const _ = require('lodash');

const domParser = require('../dom-parser/dom-parser');
// const {
//     phoneArena,
//     gsmArena,
// } = require('../selectors/index');
// const {
//     getDevicesLinks,
// } = require('./extract-devices-links.js');


// const getSite = (url) => {
//     if(url === "") {
//         return "GSMARENA";
//     } else {
//         return 1;
//     }
// }

const getPagesNumber = async (url, selector) => {
    const $ = await domParser.init(url);
    if (url === 'https://www.phonearena.com/phones/manufacturer/Samsung,Apple,Huawei,OnePlus,Xiaomi,Lenovo/') {
        const lastPageLink = $(selector).attr('href').split('/');
        const pagesNumber = lastPageLink[3];
        return pagesNumber;
    }

    if ($(selector).attr('href')) {
        const pagesNumber = $(selector).html();
        const link = $(selector).attr('href');
        const linkBuilder = link.substring(0, link.indexOf('0-p') + 3);
        const linkAddOn = link.substring(link.length - 4);

        return {
            pagesNumber,
            linkBuilder,
            linkAddOn,
        };
    }

    return {
        pagesNumber: 0,
        linkBuilder: 0,
        linkAddOn: 0,
    };
};

const getAllPages = async (url, getPagesNumberFunc, pagingSelector) => {
    if (url === 'https://www.phonearena.com/phones/manufacturer/Samsung,Apple,Huawei,OnePlus,Xiaomi,Lenovo/') {
        let pagesNumber = await getPagesNumberFunc(url, pagingSelector);
        const allUrls = Array.from({
            length: pagesNumber,
        }).map((address) => {
            return url + '/page/' + pagesNumber--;
        });

        return allUrls.reverse();
    }

    const {
        number,
        linkBuilder,
        linkAddOn,
    } = await getPagesNumberFunc(url, pagingSelector);
    let pagesNumber = number;

    if (pagesNumber) {
        const baseUrl = 'https://www.gsmarena.com/';
        const allUrls = Array.from({
            length: pagesNumber,
        }).map((address) => {
            return baseUrl + linkBuilder + (pagesNumber--) + linkAddOn;
        });

        return allUrls.reverse();
    }

    return url;
};

const getAllBrandsPagesGA = async (selector) => {
    const result = [...await Promise.all(selector.brandUrls.map((page) => {
        const pageLink = selector.homeUrl + page;
        return getAllPages(pageLink, getPagesNumber, selector.pageLinks);
    }))];

    return _.flatten(result);
};

// const getBrandPages = async (url, selector) => {
//     const $ = await domParser.init(url);

//     const allBrandsLinks = [...$(selector)]
//         .map((link) => $(link))
//         .map(($link) => $link.attr('href'))
//         .map((link) => {
//             return url + link;
//         });

//     return allBrandsLinks;
// };

// const run = async () => {
//     // const allPageLinksGA = await getAllPages('https://www.gsmarena.com/samsung-phones-9.php', getPagesNumber, gsmArena.pageLinks);
//     // console.log(allPageLinksGA);

//     const allpageLinks = await getAllBrandsPagesGA(gsmArena);
//     console.log(allpageLinks);
// };


// run();

module.exports = {
    getPagesNumber,
    getAllPages,
    getAllBrandsPagesGA,
};
