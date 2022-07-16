const { ancillaryService } = require("./AncillaryService");

const map = new Map();

const ping = async (req, res) => {
    try {
        let obj = req.body;

        if (map.has(obj.id)) {
            let list = map.get(obj.id);
            // store data as per the order (at index: order)
            list.splice(obj.order, 0, obj.payload);
            map.set(obj.id, list);
        } else {
            let list = [obj.payload];
            map.set(obj.id, list);
        }

        // check for the last packet
        if (obj.isLast) {
            let data = map.get(obj.id);
            map.delete(obj.id);
            ancillaryService(data);
        }
        res.json({ message: "Input received", "status code": 201 });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

module.exports = {
    ping,
};
