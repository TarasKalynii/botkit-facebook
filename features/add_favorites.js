const User = require('../models/user');

module.exports = function (controller) {
  controller.hears(async message => message.text && message.text.includes('ADD_TO_FAVORITES_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.slice(17, 24);
    try {
      const user = await User.findOne({ id: message.sender.id, favoriteProductList: sku });
      if (!user) {
        await User.findOneAndUpdate(
          { id: message.sender.id },
          { $push: { favoriteProductList: { $each: [sku] } } },
        );
      }
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
    bot.reply(message, { text: 'It was added.' });
  });
};
