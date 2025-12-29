const {
  getLatestData,
  getHistory
} = require("../services/deviceData.service");

exports.getLatest = async (req, res) => {
  try {
    const { thingName } = req.params;
    const data = await getLatestData(thingName);

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { thingName } = req.params;
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        error: "from and to timestamps required"
      });
    }

    const data = await getHistory(thingName, from, to);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
