const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const Purchase = require('../models/purchase');

module.exports = function (controller) {
  function createElementsForPoduct(data) {
    const buttonURL = {
      type: 'web_url',
      url: data.products[0].url,
      title: 'Read more',
    };

    const buttonBuy = {
      type: 'postback',
      title: 'Repeat',
      payload: `BUY_${data.products[0].sku}`,
    };
    const buttons = [
      buttonURL,
      buttonBuy,
    ];
    return {
      title: `${data.products[0].name} - ${data.products[0].salePrice}$`,
      image_url: data.products[0].image,
      subtitle: data.products[0].shortDescription,
      buttons,
    };
  }
  controller.hears(async message => message.text && message.text.includes('PURCHASE_'), 'facebook_postback', async (bot, message) => {
    const id = message.text.slice(9, message.text.length);
    try {
      const purchase = await Purchase.findById(id);
      await bby.products(`sku=${purchase.sku}`, { show: 'sku,name,salePrice,image,url,shortDescription' }).then(async (data) => {
        await bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [createElementsForPoduct(data)],
            },
          },
          quick_replies: [
            {
              content_type: 'text',
              title: 'My purchases',
              payload: 'true',
            },
          ],
        });
      });
    } catch (error) {
      await bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
  });
};
