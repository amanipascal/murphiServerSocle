const mailSender = require('../utils/email/sendEmail');


const sendVerificationEmail = async (email, subject, payload, template)  => {
    try {
      await mailSender(email, subject, { ...payload }, template );
      return { status:200, 
        message: `Un message d'activation à été envoyé à votre email ${email} cliquez sur lien ou utiliser le code OTP pour activer votre compte. merci`,
        data: null
      }
    } catch (error) {
      return { status: 401, massage: error.message,  data: null }
    }
  }

  module.exports = sendVerificationEmail;
