    console.log(dbProduct !== element.price)
    if (dbProduct.price !== element.price) {
      const history = await PriceHistory.findOne({ where: { productId: element.productId } });

      if (history) {
        await OldPrices.create({
          oldPrice: history.newPrice,
          newPrice: element.price,
          updatedAt: new Date(),
          priceHistoryId: history.id,
        });
        history.oldPrice = history.newPrice;
        history.newPrice = element.price;
        history.changePercentage = percentage;
        await history.save();
      } else {
        const newHistory = await PriceHistory.create({
          productId: element.productId,
          oldPrice: dbProduct.price,
          newPrice: element.price,
          changePercentage: percentage,
        });
