const Purchase = require('../models/purchase');
const User = require('../models/user');


module.exports = function (controller) {
  function createQuickRepliesList(freeCount) {
    if (freeCount > 0) {
      return [
        {
          content_type: 'text',
          title: "Let's buy",
          payload: 'true',
        },
        {
          content_type: 'text',
          title: 'Get free',
          payload: 'true',
        },
        {
          content_type: 'text',
          title: 'Cancel',
          payload: 'false',
        },
      ];
    }
    return [
      {
        content_type: 'text',
        title: "Let's buy",
        payload: 'true',
      },
      {
        content_type: 'text',
        title: 'Cancel',
        payload: 'false',
      },
    ];
  }

  controller.hears(async message => !message.text && message.message.attachments[0].payload.coordinates.lat, 'message', async (bot, message) => {
    try {
      if (await Purchase.findOne({ userId: message.sender.id, ended: false })) {
        const { lat } = message.message.attachments[0].payload.coordinates;
        const { long } = message.message.attachments[0].payload.coordinates;
        await Purchase.findOneAndUpdate(
          { userId: message.sender.id, ended: false },
          { lat, long },
        );
        const user = await User.findOne({ id: message.sender.id });

        bot.reply(message, {
          text: 'Confirm!',
          quick_replies: createQuickRepliesList(user.freeProducts),
        });
      } else {
        bot.reply(message, { text: 'Please chose product!' });
      }
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
  });
};
