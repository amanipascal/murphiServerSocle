const smsSender = require('../utils/sms/sendSMS');


const smsService = async (payload) => {
    const {phone_number, sms_msg} = payload
    const data = await smsSender(phone_number, sms_msg)
     return {
        status: 200,
        message: data.message,
        data: null
    }
  }

  module.exports = smsService;
