const User = require('../models/user');
const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');

module.exports = function (controller) {
  function createElementsForPoduct(data, result) {
    const buttonURL = {
      type: 'web_url',
      url: data.products[0].url,
      title: 'Read more',
    };
    let buttonFavorites = {};
    if (!(result)) {
      buttonFavorites = {
        type: 'postback',
        title: 'Add to favorites',
        payload: `ADD_TO_FAVORITES_${data.products[0].sku}`,
      };
    } else {
      buttonFavorites = {
        type: 'postback',
        title: 'Delete from favorites',
        payload: `DELETE_FROM_FAVORITES_${data.products[0].sku}`,
      };
    }
    const buttonBuy = {
      type: 'postback',
      title: 'Buy',
      payload: `BUY_${data.products[0].sku}`,
    };
    const buttons = [
      buttonURL,
      buttonFavorites,
      buttonBuy,
    ];
    return {
      title: `${data.products[0].name} - ${data.products[0].salePrice}$`,
      image_url: data.products[0].image,
      subtitle: data.products[0].shortDescription,
      buttons,
    };
  }


  controller.hears(async message => message.text && message.text.includes('INFO_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.slice(5, 12);
    // console.log(sku);
    await bby.products(`sku=${sku}`, { show: 'sku,name,salePrice,image,url,shortDescription' }).then(async (data) => {
    // console.log(data.products[0]);
      const result = await User.findOne({ id: message.sender.id, favoriteProductList: sku });
      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [createElementsForPoduct(data, result)],
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
    });
    // await bot.reply(message,{ text: 'Something.' });
  });
};
