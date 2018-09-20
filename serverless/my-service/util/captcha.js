const googleRecaptcha = require('google-recaptcha');

const captcha = new googleRecaptcha({
  secret: process.env.CAPTCHA_SECRET_KEY,
});

module.exports = function verifyCaptcha(captchaResponse) {
  return new Promise((resolve, reject) => {
    captcha.verify({response: captchaResponse}, err => {
      if(err) {
        reject('reCaptcha failed: ' + err);
      }

      resolve({ success: 1 });
    });
  });
}

