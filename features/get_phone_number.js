const Purchase = require('../models/purchase');
// regular expression for phone number
const regularExpression  = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

module.exports = function (controller) {
  controller.hears(async message => message.text && message.text.match(regularExpression) !== null, 'message', async (bot, message) => {
    try {
      if (await Purchase.findOne({ userId: message.sender.id, ended: false })) {
        await Purchase.findOneAndUpdate(
          { userId: message.sender.id, ended: false },
          { phoneNumber: message.text },
        );
        bot.reply(message, {
          text: 'Get your location!',
          quick_replies: [
            {
              content_type: 'location',
            },
          ],
        });
      } else {
        bot.reply(message, { text: 'Please chose product!' });
      }
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
  });
};
