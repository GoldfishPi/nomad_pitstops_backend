
const express = require('express');
const router = express.Router();
const model = require('./../models/pitstop');

router.post('/', (req, res, next) => {
    let newPitstop = new model({
        name: req.body.name,
        notes: req.body.notes,
        connection: req.body.connection,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    });

    console.log('making a new pitstop', req.body);

    newPitstop.save()
        .then(function(model,b) {
            if(!model.errors) {
                res.json({success: true, msg: 'Pitstop added'})
            } else {
                res.json({success: false, msg: 'Failed to add pitstop'})
            }
        })
});
router.get('/', (req, res, next) => {
    model.find({}, (err, pitstops) => {
        res.json(pitstops)
    })
    
});
module.exports = router;