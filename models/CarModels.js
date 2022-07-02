const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    name: String,
    price: String,
    model: String
});

const CarModel = mongoose.model("cars",carSchema);
module.exports = CarModel;