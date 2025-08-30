import { updateData } from '../controllers/updateData';
import { Request, Response } from 'express';

const getBeers = async (req: Request, res: Response) => {
  console.log("Updating beer data")
  try {
    const beer = ['assortment', '--category', "Öl"];
    await updateData(beer);
    return res.status(201).send('Updated beer data')
  } catch (error) {
    return res.status(500).send('Internal server error: ', error)
  }
}

export { getBeers };
