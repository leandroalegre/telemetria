
import { getRepository, getManager } from 'typeorm';
import { Request, Response, request } from 'express';
import { validate } from 'class-validator';
import { Valores } from '../entity/Planta';

export class PlantaController {

 /* static findLecturas = async (req:Request, res:Response)=>{

    const {dni} = req.params;
    const plantaRepository = getRepository(Valores)
    let planta
    try {
      planta = await plantaRepository.)
    } catch (error) {
      res.send(false)
    }

    res.send(planta)
  }*/


  static getLecturas = async (req:Request, res:Response) => {

    const manager = getManager();
    let Valores;

    Valores = await manager.query(`SELECT v.* from valores v`);

    if (Valores.length > 0) {
      res.send(Valores);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  }






}

export default PlantaController;