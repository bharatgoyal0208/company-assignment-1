const { ancillaryService } = require("./AncillaryService");
const { webHookService } = require("./WebHookService");

const map = new Map();

const ping = async (req, res) => {
    try {
        let obj = req.body;

        if (map.has(obj.id)) {
            let oldData = map.get(obj.id);
            oldData.message.push(obj);
            if (obj.isLast) {
                oldData.isLast = obj.isLast;
                oldData.index = obj.order;
            }
            map.set(obj.id, oldData);
        } else {
            let constructedData = {
                message: [obj],
                isLast: obj.isLast,
                index: obj.order,
            };
            map.set(obj.id, constructedData);
        }

        let data = map.get(obj.id);
        if (data.isLast && data.message.length == data.index) {
            map.delete(obj.id);

            data.message = getData(data.message);

            let processedData = ancillaryService(data, obj.id);
            webHookService(processedData, obj.id);
        }
        res.json({ message: "Input received", "status code": 201 });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const getData = (data) => {
    data.sort(function (a, b) {
        return a.order - b.order;
    });
    return data;
};

module.exports = {
    ping,
};
