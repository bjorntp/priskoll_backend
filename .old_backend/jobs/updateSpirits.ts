import { updateData } from '../controllers/updateData';
import { Request, Response } from 'express';

const getSpirits = async (req: Request, res: Response) => {
  console.log("Updating spirit data")
  try {
    let sprit = ['assortment', '--category', "Sprit"];
    await updateData(sprit);
    return res.status(201).send('Updated spirit data')
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).send(`Internal server error: ${error.message}`)
  }
}

export { getSpirits };
