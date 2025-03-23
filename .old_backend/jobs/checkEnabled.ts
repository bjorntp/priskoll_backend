import { Product } from '../models/Product';

const checkOld = async () => {
  const products = await Product.findAll({
    where: {
      [Op.or]: [{ enabled: true }, { enabled: null }]
    });

  for (const p of products) {
    const now = new Date();
    const oneWeekAgo = new Date();
    let countActive = 0, countOld = 0;
    oneWeekAgo.setDate(now.getDate() - 7)
    if (p.lastSeen) {
      const compare = new Date(p.lastSeen)
      countOld++
    } else {
      countActive++
    }
  }
}


export { checkOld };
