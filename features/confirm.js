const Purchase = require('../models/purchase');
const User = require('../models/user');

module.exports = function (controller) {
  controller.hears(["Let's buy", 'Get free'], 'message', async (bot, message) => {
    try {
      const user = await User.findOne({ id: message.sender.id });
      if (user.freeProducts === 0 && message.text === 'Get free') {
        await bot.reply(message, 'Invite friends, please!');
      } else {
        let { freeProducts } = user;
        let purchase_method = false;
        if (user.freeProducts > 0 && message.text === 'Get free') {
          purchase_method = true;
          freeProducts -= 1;
        }
        const purchase = await Purchase.findOne({ userId: message.sender.id, ended: false });
        await User.findOneAndUpdate(
          { id: message.sender.id },
          { $push: { purchases: { $each: [purchase._id] } }, freeProducts },
        );
        await Purchase.findOneAndUpdate(
          { userId: message.sender.id, ended: false },
          { ended: true, free: purchase_method },
        );
        await bot.reply(message, 'Congratulations! Our courier will contact you!');
      }
    } catch (error) {
      await bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
  });
};
