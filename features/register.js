const User = require('../models/user');

module.exports = function (controller) {
  controller.hears(async message => message.text && message.text.includes('REGISTER'), 'facebook_postback', async (bot, message) => {
    try {
      if (!(await User.findOne({ id: message.sender.id }))) {
        await User.create({ id: message.sender.id, freeProducts: 0, referalCount: 0 });
        if (message.postback.referral) {
          const user = await User.findOne({ id: message.postback.referral.ref });
          if (user.referalCount < 2) {
            await User.findOneAndUpdate(
              { id: message.postback.referral.ref },
              { referalCount: user.referalCount + 1 },
            );
          } else {
            await User.findOneAndUpdate(
              { id: message.postback.referral.ref },
              { freeProducts: user.freeProducts + 1, referalCount: 0 },
            );
          }
          const botWorker = await controller.spawn(message.postback.referral.ref);
          await botWorker.startConversationWithUser(message.postback.referral.ref);
          await botWorker.say('Your link is activated!');
          await bot.reply(message, { text: 'Link is activated!' });
        }
      }
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
    bot.reply(message, {
      text: 'Hello!',
      quick_replies: [
        {
          content_type: 'text',
          title: 'My purchases',
          payload: 'true',
        },
        {
          content_type: 'text',
          title: 'Shop',
          payload: 'false',
        },
        {
          content_type: 'text',
          title: 'Favorites',
          payload: 'false',
        },
        {
          content_type: 'text',
          title: 'To invite a friend',
          payload: 'false',
        },
      ],
    });
  });
};
