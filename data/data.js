const {
    Brand,
    Features,
    Webpage,
} = require('../models');

const Data = require('./data-generic');

module.exports = {
    brands: new Data(Brand),
    features: new Data(Features),
    webpage: new Data(Webpage),
};
