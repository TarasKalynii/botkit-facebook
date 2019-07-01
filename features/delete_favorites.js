const User = require('../models/user');

module.exports = function (controller) {
  controller.hears(async message => message.text && message.text.includes('DELETE_FROM_FAVORITES_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.slice(22, 29);
    try {
      await User.findOneAndUpdate(
        { id: message.sender.id },
        { $pull: { favoriteProductList: sku } },
      );
    } catch (error) {
      await bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
    await bot.reply(message, { text: 'It was deleted.' });
  });
};
