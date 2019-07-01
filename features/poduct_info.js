const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');

const User = require('../models/user');

module.exports = function (controller) {
  function createElementsForPoduct(data, searchResult) {
    const buttonURL = {
      type: 'web_url',
      url: data.products[0].url,
      title: 'Read more',
    };
    let buttonFavorites = {};
    if (!(searchResult)) {
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
    try {
      await bby.products(`sku=${sku}`, { show: 'sku,name,salePrice,image,url,shortDescription' }).then(async (data) => {
        const searchResult = await User.findOne({ id: message.sender.id, favoriteProductList: sku });
        bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [createElementsForPoduct(data, searchResult)],
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
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
  });
};
