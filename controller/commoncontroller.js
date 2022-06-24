const { v4: uuidv4 } = require('uuid');
const registation = require('../models/registration');
const user = require('../models/user');
const populate_data = require('../models/populatedata');
const logger = require('../middleware/logger');
const { popularJSONdata } = require('./microservice');
uuidv4();

exports.addregistration = async (req, res) => {
    try {
        const { note, name, application_id, registration_date, appointment_no, applicant_Photo, date_of_birth, gender, fees_amount, remark, contact_no, aadhaar_no, address } = req.body;
        var registration = await registation.create({
            note: note,
            UUID: uuidv4(),
            name: name,
            application_id: application_id,
            registration_date: registration_date,
            appointment_no: appointment_no,
            applicant_Photo: applicant_Photo,
            date_of_birth: date_of_birth,
            gender: gender,
            fees_amount: fees_amount,
            remark: remark,
            contact_no: contact_no,
            aadhaar_no: aadhaar_no,
            address: address,

        });
        if (registration) {
            await registration.save();
            logger.accessLog.info("this is API call from /common/registration success Msg")
            res.send({
                statusCode: 200,
                msg: "success",
            });
        }
    } catch (error) {
        logger.errorLog.error(`this is API call from /common/registration Fail Msg: ${error}`)
        res.json({
            statusCode: 400,
            msg: "error",
        });
    }
};


exports.adduser = async (req, res) => {
    try {

        const { email_verified_at, remeber_token, note, first_name, last_name, email, phone, password, is_operator } = req.body;
        var User = await user.create({
            note: note,
            UUID: uuidv4(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            password: password,
            is_operator: is_operator,
            email_verified_at: email_verified_at,
            remeber_token: remeber_token,
        });

        if (User) {
            await User.save();
            logger.accessLog.info("this is API call from /common/user success Msg")
            res.send({
                statusCode: 200,
                msg: "success",
            });
        }
    } catch (error) {
        logger.errorLog.error(`this is API call from /common/user Fail Msg: ${error}`)
        res.json({
            statusCode: 400,
            msg: "error",
        });
    }
};

exports.populateData = async (req, res) => {
    try {
        const { note, tagId, Coordinate, timeStamp, massage } = req.body;
        var populate = await populate_data.create({
            note: note,
            tagId: tagId,
            Coordinate: Coordinate,
            timeStamp: timeStamp,
            massage: massage,

        });

        if (populate) {
            await populate.save();
            logger.accessLog.info("this is API call from /common/populate success Msg")
            res.send({
                statusCode: 200,
                msg: "success",
            });
        }
    } catch (error) {
        logger.errorLog.error(`this is API call from /common/populate Fail Msg: ${error}`)
        res.json({
            statusCode: 400,
            msg: "error",
        });
    }
};

exports.PopulateById = async (req, res) => {
    try {
        const application_id = req.params.id
        console.log(application_id.toString());
        const populate = await populate_data.find({ application_id: application_id.toString() });
        res.send(populate);

    }
    catch (error) {
        logger.errorLog.error(`this is API call from /allpopulate Fail Msg: ${error}`)
        res.json({
            statuscode: 400,
            msg: "error",
        });
    }
};
exports.allpopulatejsondata = async (req, res) => {
    try {
        const { data } = req.body;

        await popularJSONdata(data)
        logger.accessLog.info(`this is API call from /populatejsondata success`)
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
  
exports.resultData = async (req, res) => {
    const id = req.params.id
    const testData = await test.findById(id)
    const populate = await registation.findById(testData.registration_id);
    res.send({ "test": testData, "applicant": populate })
}