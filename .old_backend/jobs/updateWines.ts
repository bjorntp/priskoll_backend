import { updateData } from '../controllers/updateData';
import { Request, Response } from 'express';

const getRestWine = async (req: Request, res: Response) => {
  try {
    console.log("Updating non red and white wine data")
    const argsMousserande = ['assortment', '--category', "Vin", '--subcategory', 'Mousserande vin'];
    await updateData(argsMousserande);
    const argsRose = ['assortment', '--category', "Vin", '--subcategory', 'Rosevin'];
    await updateData(argsRose);
    const argsLada = ['assortment', '--category', "Vin", '--subcategory', 'Vinlada'];
    await updateData(argsLada);
    const argsStarkvin = ['assortment', '--category', "Vin", '--subcategory', 'Starkvin'];
    await updateData(argsStarkvin);
    const argsSmakFrukt = ['assortment', '--category', "Vin", '--subcategory', 'Smaksatt vin fruktvin'];
    await updateData(argsSmakFrukt);
    const argsVermouth = ['assortment', '--category', "Vin", '--subcategory', 'Vermouth'];
    await updateData(argsVermouth);
    const argsSake = ['assortment', '--category', "Vin", '--subcategory', 'Sake'];
    await updateData(argsSake);
    const argsApert = ['assortment', '--category', "Vin", '--subcategory', 'Aperitifer'];
    await updateData(argsApert);
    const argsFlera = ['assortment', '--category', "Vin", '--subcategory', 'drycker av flera typer'];
    await updateData(argsFlera);
    return res.status(201).send("Updated wine data")
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getWhite = async (req: Request, res: Response) => {
  try {
    console.log("Updating white wine data")
    const argsVitt = ['assortment', '--category', "Vin", '--subcategory', 'Vitt vin'];
    await updateData(argsVitt);
    return res.status(201).send("Updated white wine data")
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getRed = async (req: Request, res: Response) => {
  try {
    console.log("Updating red wine data")
    const argsRott = ['assortment', '--category', "Vin", '--subcategory', 'Rött vin'];
    await updateData(argsRott);
    return res.status(201).send("Updated red wine data")
  } catch (error) {
    return res.status(500).send(error)
  }
}

export { getRestWine, getWhite, getRed };
