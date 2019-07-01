const Purchase = require('../models/purchase');
const User = require('../models/user');

module.exports = function (controller) {
  controller.hears(async message => message.text && message.text.includes('BUY_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.slice(4, 11);
    try {
      const user = await User.findOne({ id: message.sender.id });
      if (!(await Purchase.findOne({ userId: message.sender.id, ended: false }))) {
        await Purchase.create({
          userDBId: user._id, userId: message.sender.id, ended: false, sku, timestamps: true, phoneNumber: '+0000000000'
        });
      } else {
        await Purchase.findOneAndUpdate(
          { userId: message.sender.id, ended: false },
          { sku },
        );
      }
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
    bot.reply(message, {
      text: 'Get your phone number!',
      quick_replies: [
        {
          content_type: 'user_phone_number',
        },
      ],
    });
  });
};
