const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');

module.exports = function (controller) {
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


  controller.hears('Best-selling', 'message', async (bot, message) => {
    await bby.products('onlineAvailability=true', { show: 'sku,name,salePrice,salesRankMediumTerm,image', sort: 'salesRankMediumTerm.asc' }).then(async (data) => {
      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: getElementsForProductsList(data),
          },
        },
      });
    });
  });
};
