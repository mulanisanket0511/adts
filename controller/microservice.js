
const mqtt = require('mqtt')
const { jsondata } = require('../jsondata')
const raw_data = require('../models/rawdata')
const Populatedata = require('../models/populatedata')
const track = require('../models/track')
const client = mqtt.connect('mqtt://test.mosquitto.org')
const logger = require('../middleware/logger');
const populatedata = require('../models/populatedata')
const test = require('../models/test')




exports.mqqt_microservices = () => {

    try {
        client.on('connect', function () {
            client.subscribe('jsondata', function (err) {
                if (!err) {
                    client.publish('jsondata', jsondata)
                }
            })
        })

        client.on('message', async (topic, message) => {
            const newData = await raw_data.create({
                JSON_data: message.toString()
            })

            newData.save()
            this.populate_data()

        })
        logger.accessLog.info("microservice is succesfully connected and raw data added in database")
    }
    catch {
        if (error) {
            logger.errorLog.error(`microservice is connection loss: ${error}`)
        }
    }
}

exports.populate_data = async (req, res) => {
    try {
        const allData = await raw_data.find({ is_populated: false });
        allData.map(async (item) => {
            const raw_data_json = JSON.parse(item.JSON_data)[0]


            const raw_coordinate = raw_data_json.coordinates
            const populate_tag5 = await Populatedata.find({$query: {tagId:5}, $orderby: {$natural : -1}})
            const populate_coordinate = populate_tag5[populate_tag5.length -1].Coordinate
            if(raw_coordinate.x === populate_coordinate.x &&raw_coordinate.y === populate_coordinate.y ){
                var stoppage = true
            }
            else{
                var stoppage = false
            }
            
            const tag_id = await track.findOne({ $or: [{ tag1: raw_data_json.tagId }, { tag2: raw_data_json.tagId }, { tag3: raw_data_json.tagId }, { tag4: raw_data_json.tagId }, { tag5: raw_data_json.tagId }] })

            if (tag_id) {
                const newData = await Populatedata.create({
                    tagId: raw_data_json.tagId,
                    Coordinate: raw_data_json.coordinates,
                    timeStamp: raw_data_json.data.debugging.positioning_output[0].timestamp,
                    massage: raw_data_json.data.debugging.positioning_output[0].status_list[0].message,
                    application_id: tag_id.application_id,
                    stoppage:stoppage
                })
                await newData.save()
                const oneRawData = await raw_data.findOneAndUpdate({ _id: item._id }, { $set: { is_populated: true } });
                await oneRawData.save()
                logger.accessLog.info("Populated Data is Added in database succesfully Connected")
            }
        })
    }
    catch (error) {
        logger.errorLog.error(`Populated Data Adding Fail: ${error}`)
    }
}

exports.popularJSONdata = async (data) => {
    try {
        data.map(async (item) => {
            var populate = await Populatedata.create({
                application_id: item.application_id,
                tagId: item.tagId,
                Coordinate: item.Coordinate,
                timeStamp: item.timeStamp,
                massage: item.massage,
            });
            if (populate) {
                await populate.save();
                logger.accessLog.info("this is API call from allpopulatedjsondata success Msg")

            }
        })

    }
    catch (error) {
        logger.errorLog.error(`allpopulatedjsondata Adding Fail: ${error}`)
    }

}
exports.endtest_result = async (application_id,id) => {
    try {
        const allData = await populatedata.find({ $and: [{ application_id: application_id }, { tagid: "5" }] });
      
        var distanceInMM = 0 
        allData.map((item, index) => {
            if (index !== 0) {
                distanceInMM += Math.sqrt((item.Coordinate.x - allData[index - 1].Coordinate.x) * (item.Coordinate.x - allData[index - 1].Coordinate.x) + (item.Coordinate.y - allData[index - 1].Coordinate.y) * (item.Coordinate.y - allData[index - 1].Coordinate.y))
            }
        })
        const distanceInKM = distanceInMM / 1000000
      
        // const timeInMS = allData[allData.length-1].timeStamp - allData[0].timeStamp
        const timeInMS = 110000
        const timeInHOURS = timeInMS /3600000
        const avgSpeed = distanceInKM / timeInHOURS
        console.log("124",avgSpeed);
        const updateTestData = await test.findOneAndUpdate({_id:id},{$set:{avg_speed:avgSpeed,test_duration:timeInMS/1000}})
        if(updateTestData){
            await updateTestData.save()
        }
         
        
    } catch (error) {
        console.log(error);
    }
}