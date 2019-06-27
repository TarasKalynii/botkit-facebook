const Purchase = require('../models/purchase');

const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

module.exports = function (controller) {
  controller.hears(async message => message.text && message.text.match(re) !== null, 'message', async (bot, message) => {
    if (await Purchase.findOne({ userId: message.sender.id, ended: false })) {
      await Purchase.findOneAndUpdate(
        { userId: message.sender.id, ended: false },
        { phoneNumber: message.text },
      );
      await bot.reply(message, {
        text: 'Get your location!',
        quick_replies: [
          {
            content_type: 'location',
          },
        ],
      });
    } else {
      await bot.reply(message, { text: 'Please chose product!' });
    }
  });
};
