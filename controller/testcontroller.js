const Test = require('../models/test')
const { v4: uuidv4 } = require('uuid');
const track = require('../models/track');
const logger = require('../middleware/logger');
const test = require('../models/test');
const { endtest_result } = require('./microservice');
uuidv4();


  
exports.endtest = async (req, res) => {
    try {
        const { application_id,id,result_JSON_data } = req.body;
        endtest_result(application_id,id)
        const data = await test.findByIdAndUpdate(id, {
            $set: {
                kreb_hit: result_JSON_data.ErrorData,
                start_time: result_JSON_data.startTime,
                end_time: result_JSON_data.endTime,
                result: result_JSON_data.resultMSG,
                image_data_url:result_JSON_data.dataURL
            }
        })
        if (data) {
            await data.save();
            const trackupdateData = await track.findOneAndUpdate({ test_id: id }, {
                $set: {
                    application_id: null,
                    tag1: null,
                    tag2: null,
                    tag3: null,
                    tag4: null,
                    tag5: null,
                    tag6: null,
                    tag7: null,
                    tag8: null,
                    tag9: null,
                    tag10: null,
                    test_id: null,
                }
            })
            if (trackupdateData) {
                await trackupdateData.save()
            }
           

        }
        logger.accessLog.info(`this is API call from /end test success`)
        res.json({
            statusCode: 200,
            msg: "success",
        });

    } catch (error) {
        logger.errorLog.error(`this is API call from /common/populate Fail Msg: ${error}`)
        res.json({
            statusCode: 400,
            msg: "error",
        });
    }
};
