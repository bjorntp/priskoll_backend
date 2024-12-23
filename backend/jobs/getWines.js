const updateData = require('../controllers/updateData')

const getWines = () => {
  let argsMousserande = ['assortment', '--category', "Vin", '--subcategory', 'Mousserande vin'];
  updateData(argsMousserande);
  let argsVitt = ['assortment', '--category', "Vin", '--subcategory', 'Vitt vin'];
  updateData(argsVitt);
  let argsRott = ['assortment', '--category', "Vin", '--subcategory', 'Rött vin'];
  updateData(argsRott);
  let argsRose = ['assortment', '--category', "Vin", '--subcategory', 'Rosevin'];
  updateData(argsRose);
  let argsLada = ['assortment', '--category', "Vin", '--subcategory', 'Vinlada'];
  updateData(argsLada);
  let argsStarkvin = ['assortment', '--category', "Vin", '--subcategory', 'Starkvin'];
  updateData(argsStarkvin);
  let argsSmakFrukt = ['assortment', '--category', "Vin", '--subcategory', 'Smaksatt vin fruktvin'];
  updateData(argsSmakFrukt);
  let argsVermouth = ['assortment', '--category', "Vin", '--subcategory', 'Vermouth'];
  updateData(argsVermouth);
  let argsSake = ['assortment', '--category', "Vin", '--subcategory', 'Sake'];
  updateData(argsSake);
  let argsApert = ['assortment', '--category', "Vin", '--subcategory', 'Aperitifer'];
  updateData(argsApert);
  let argsFlera = ['assortment', '--category', "Vin", '--subcategory', 'drycker av flera typer'];
  updateData(argsFlera);
}

module.exports = getWines;
