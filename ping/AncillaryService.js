const fs = require("fs");

const ancillaryService = async (data, id) => {
    try {
        // process data

        // data out
        fs.appendFile(
            `data_request_${id}.txt`,
            `${new Date() + ": " + data},\r\n`,
            function (err) {
                if (err) throw err;
                console.log("File is updated successfully.");
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    ancillaryService,
};
