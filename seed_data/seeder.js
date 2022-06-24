const populate_data = require('../models/populatedata');
const raw_data = require('../models/rawdata');
const registration = require('../models/registration');
const tag = require('../models/tag');
const test = require('../models/test');
const track = require('../models/track');
const user = require('../models/user');
const vehicle = require('../models/vehicle');
const data = require('./seederData');
const anchor = require('../models/anchor');
const dbconnection = require('../config/db');
const logger = require('../middleware/logger');

dbconnection()


const importData = async () => {
  try {
    const populatedata = await populate_data.create(data[0]);
    const rawdata = await raw_data.create(data[1]);
    const users = await user.create(data[2]);
    const Registration = await registration.create(data[3]);
    const Vehicle = await vehicle.create(data[4]);
    const Tag = await tag.create(data[5]);
    const Test = await test.create(data[6]);
    const Anchor = await anchor.create(data[7]);
    const Track = await track.create(data[8]);
    await populatedata.save()
    await rawdata.save()
    await users.save()
    await Registration.save()
    await Vehicle.save()
    await Tag.save()
    await Test.save()
    await Anchor.save()
    await Track.save()
    logger.accessLog.info('seeder run succesfully...');
    process.exit();
  } catch (err) {
    logger.errorLog.error(err);
  }
};
importData()