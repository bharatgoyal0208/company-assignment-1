const fs = require("fs");

const ancillaryService = (data, id) => {
    try {
        // process data
        let d = [];
        data.message.forEach(element => {
            d.push(element.payload.length);
        });
        return d;

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    ancillaryService,
};
