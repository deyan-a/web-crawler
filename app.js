const {
    iteratePhones,
} = require('./fill-db/index');

const run = async () => {
    await iteratePhones();
};

run();
