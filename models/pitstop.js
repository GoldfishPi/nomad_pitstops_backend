const mongoose = require('mongoose');

const PitstopSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    notes: {
        type: String,
        require: false,
    },
    connection: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true
    },
    latitude: {
        type: Number,
        require: true
    }
});

const Pitstop = module.exports = mongoose.model('Pitstop', PitstopSchema);

