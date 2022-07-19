const fs = require("fs");

const webHookService = async (data, id) => {
    try {
        // process data
        let str = "";
        data.forEach((element) => {
            str = str.concat(element + "\n");
        });

        // data out
        fs.writeFileSync(`data_request_${id}.txt`, str, function (err) {
            if (err) throw err;
            console.log("File is updated successfully.");
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    webHookService,
};
