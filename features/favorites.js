const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const User = require('../models/user');

module.exports = function (controller) {
  function getFilterString(favoriteProductList) {
    let string = `sku=${favoriteProductList[0]}`;
    for (let i = 1; i < favoriteProductList.length; i++) {
      string += `|sku=${favoriteProductList[i]}`;
    }
    return string;
  }

  function getElementsForProductsList(data) {
    const elements = [];
    for (let i = 0; i < data.products.length; i++) {
      // data.products[i]
      // create button
      const button = {
        type: 'postback',
        title: 'Info',
        payload: `INFO_${data.products[i].sku}`,
      };
      // create buttons array
      const buttons = [button];
      // create element
      const element = {
        title: data.products[i].name,
        image_url: data.products[i].image,
        buttons,
      };
      elements.push(element);
    }
    return elements;
  }


  controller.hears('Favorites', 'message', async (bot, message) => {
    try {
      const user = await User.findOne({ id: message.sender.id });
      if (user.favoriteProductList.length !== 0) {
        await bby.products(getFilterString(user.favoriteProductList), { show: 'sku,name,salePrice,image,url,shortDescription' }).then(async (data) => {
          bot.reply(message, {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: getElementsForProductsList(data),
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
      } else {
        bot.reply(message, 'Please add something.');
      }
    } catch (error) {
      bot.reply(message, { text: 'Something was wrong. Try again.' });
    }
  });
};
