const { v4: uuidv4 } = require('uuid');
const track = require('../models/track');
const logger = require('../middleware/logger');
const test = require('../models/test');
uuidv4();

exports.addTrack = async (req, res) => {
    try {
        const { note, name, JSON_data} = req.body;
        var createTrack = await track.create({
            note: note,
            UUID: uuidv4(),
            name: name,
            JSON_data: JSON_data,
        });
     if(createTrack){
        await createTrack.save()
        logger.accessLog.info(`this is API call from /track/addtrack success`)
        res.json({
            statusCode: 400,
            msg: "error",
        });
     }
    } catch (error) {
        logger.errorLog.error(`this is API call from /track/addtrack Fail Msg: ${error}`)
        res.json({
            statusCode: 400,
            msg: "error",
        });
    }
};

exports.alltrack = async(req,res)=>{
    try {
        const Track = await track.find({}).lean();
        res.send(Track);
      } catch (error) {
        res.json({
            statuscode:400,
          msg: "error",
        });
      }
    };

