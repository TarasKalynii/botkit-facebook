const User = require('../models/user');

module.exports = function (controller) {
  function getPurchaseList(list) {
    const elements = [];
    for (let i = 0; i < list.length; i++) {
      // data.products[i]
      // create button
      const button = {
        type: 'postback',
        title: 'Purchase info',
        payload: `PURCHASE_${list[i]._id}`,
      };
      // create buttons array
      const buttons = [button];
      // create element
      const updatedAt = `${list[i].updatedAt}`;
      let dataString = '';
      for (let j = 4; j < 10; j++) {
        dataString += updatedAt[j];
      }
      const element = {
        title: dataString,
        buttons,
      };
      elements.push(element);
    }
    return elements;
  }

  controller.hears('My purchases', 'message', async (bot, message) => {
    const user = await User.findOne({ id: message.sender.id }).populate({ path: 'purchases' });
    if (user.purchases.length > 0) {
      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: getPurchaseList(user.purchases),
          },
        },
        quick_replies: [
          {
            content_type: 'text',
            title: 'Main menu',
            payload: 'MAIN_MENU',
          },
        ],
      });
    } else {
      await bot.reply(message, { text: 'Please buy something!' });
    }
    // await bot.reply(message, { text: 'Please buy something!' });
  });
};
