module.exports = function (controller) {
  controller.hears('Go search', 'message', async (bot, message) => {
    // var bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
    // await bby.products('search=oven&search=stainless&search=steel', { show: 'sku,name,salePrice' }).then(function (data){
    //   console.log(data);
    // });
    await bot.reply(message, "It's searched product.");
  });
};
