const updateData = require('../controllers/updateData')

const getWines = async (req, res) => {
  try {
    console.log("Updating wine data")
    //let argsMousserande = ['assortment', '--category', "Vin", '--subcategory', 'Mousserande vin'];
    //await updateData(argsMousserande);
    //let argsVitt = ['assortment', '--category', "Vin", '--subcategory', 'Vitt vin'];
    //await updateData(argsVitt);
    //let argsRott = ['assortment', '--category', "Vin", '--subcategory', 'Rött vin'];
    //await updateData(argsRott);
    //let argsRose = ['assortment', '--category', "Vin", '--subcategory', 'Rosevin'];
    //await updateData(argsRose);
    //let argsLada = ['assortment', '--category', "Vin", '--subcategory', 'Vinlada'];
    //await updateData(argsLada);
    //let argsStarkvin = ['assortment', '--category', "Vin", '--subcategory', 'Starkvin'];
    //await updateData(argsStarkvin);
    //let argsSmakFrukt = ['assortment', '--category', "Vin", '--subcategory', 'Smaksatt vin fruktvin'];
    //await updateData(argsSmakFrukt);
    //let argsVermouth = ['assortment', '--category', "Vin", '--subcategory', 'Vermouth'];
    //await updateData(argsVermouth);
    let argsSake = ['assortment', '--category', "Vin", '--subcategory', 'Sake'];
    await updateData(argsSake);
    let argsApert = ['assortment', '--category', "Vin", '--subcategory', 'Aperitifer'];
    await updateData(argsApert);
    let argsFlera = ['assortment', '--category', "Vin", '--subcategory', 'drycker av flera typer'];
    await updateData(argsFlera);
    return res.status(201).send()
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = getWines;
