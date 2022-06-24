

var winston = require('winston');
var path = require('path');
    
var logPath = __dirname;

const logformat = winston.format.combine(
    winston.format.align(),
    winston.format.timestamp({format:'DD-MM-YYYY T hh:mm:ss.sss A'}),
    winston.format.printf(({ level, message, timestamp, label }) => {
        return `[ ${level.toUpperCase()} | ${timestamp} | LOG:${message} ]`;
    }))
    
const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'alllog.log'),
            format:logformat,
            level: 'error'
        })
    ]
});


const accessLog = winston.createLogger({
    
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'alllog.log'),
            format:logformat,
            level: 'info'
        })
    ]
});
      
    
module.exports = { errorLog:errorLog,accessLog: accessLog};
