
import { Users } from './../entity/Users';
import { getRepository, getManager } from 'typeorm';
import { Request, Response, request } from 'express';
import { validate } from 'class-validator';
import { send } from 'process';

export class PanelcontrolController {
  static getAllpersonas = async (req: Request, res: Response) => {
    const manager = getManager();
    let query;

    query = await manager.query(`
      SELECT p.nombre_completo, p.id_persona FROM personas p
    `);

    if (query.length > 0) {
      res.send(query);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  };

  static getAllreferentes = async (req: Request, res: Response) => {
    const manager = getManager();
    let query;

    query = await manager.query(`
      SELECT p.* FROM personas p, users u WHERE p.id_persona = u.id_persona AND u.role = 'referente'
    `);

    if (query.length > 0) {
      res.send(query);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  };

  static getRoleByIdPersona = async (req: Request, res: Response) => {
    const manager = getManager();
    const { id } = req.params;
    let query;

    query = await manager.query(`
      SELECT u.role FROM users u WHERE u.id_persona = ?
    `, [id]);

    if (query.length > 0) {
      res.send(query);
    } else {
      res.send(false);
    }
  };

  static nuevoReferente = async (req: Request, res: Response) => {
    const manager = getManager();
    const { id } = req.params;
    let query, query2, query3;

    query = await manager.query(`
      SELECT u.* FROM users u WHERE u.id_persona = ?
    `, [id]);

    if (query.length > 0) {
      query2 = await manager.query(`
      UPDATE users u SET u.role = 'referente' WHERE u.id_persona = ?
      `, [id]);
      res.send(true);
    } else {
      query3 = await manager.query(`
      SELECT p.* FROM personas p WHERE p.id_persona = ?
      `, [id]);
      const us = new Users();
      us.id_persona = query3[0].id_persona;
      us.username = query3[0].dni;
      us.password = '';
      us.role = 'referente'

      // Validate
      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(us, validationOpt);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      // TODO: HASH PASSWORD

      const userRepository = getRepository(Users);
      try {
        await userRepository.save(us);
        return res.status(200).json({ message: 'Usuario cargado' });
      } catch (e) {
        return res.status(409).json({ message: 'Algo mal que no esta bien' });
      }
    }
  };

  static quitarReferente = async (req: Request, res: Response) => {
    const manager = getManager();
    const { id } = req.params;
    let query2;

    query2 = await manager.query(`
      UPDATE users u SET u.role = 'sin rol' WHERE u.id_persona = ?
      `, [id]);
    res.send(true);

  };

  static referenciarPersona = async (req: Request, res: Response) => {
    const manager = getManager();
    const {id_persona, id_persona_referente} = req.body;
    let query, query2, oldref;

    query2 = await manager.query(`
      SELECT rf.* FROM relaciones_referente rf WHERE rf.id_persona = ?
    `, [id_persona]);

    oldref = query2[0].id_persona_referente;

    query = await manager.query(`
      UPDATE relaciones_referente rf SET rf.id_persona_referente = ? WHERE rf.id_persona = ?
    `, [id_persona_referente, id_persona]);

    if (oldref == 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  };

  static nuevoFiscal = async (req: Request, res: Response) => {
    const manager = getManager();
    const { id } = req.params;
    const {role} = req.body;
    let query, query2, query3;

    query = await manager.query(`
      SELECT u.* FROM users u WHERE u.id_persona = ?
    `, [id]);

    if (query.length > 0) {
      query2 = await manager.query(`
      UPDATE users u SET u.role = ? WHERE u.id_persona = ?
      `, [role, id]);
      res.send(true);
    } else {
      query3 = await manager.query(`
      SELECT p.* FROM personas p WHERE p.id_persona = ?
      `, [id]);
      const us = new Users();
      us.id_persona = query3[0].id_persona;
      us.username = query3[0].dni;
      us.password = '';
      us.role = role;

      // Validate
      const validationOpt = { validationError: { target: false, value: false } };
      const errors = await validate(us, validationOpt);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      // TODO: HASH PASSWORD

      const userRepository = getRepository(Users);
      try {
        await userRepository.save(us);
        return res.status(200).json({ message: 'Usuario cargado' });
      } catch (e) {
        return res.status(409).json({ message: 'Algo mal que no esta bien' });
      }
    }
  };

  static nuevaOposicion = async (req: Request, res: Response) => {
    const manager = getManager();
    const { id } = req.params;
    const {oposicion} = req.body;
    let query, query2;

    if(oposicion == 1){
      query = await manager.query(`
        SELECT p.* FROM personas p WHERE p.id_persona = ? AND p.oposicion = 1
      `, [id]);

      if (query.length > 0) {
        res.send(false);
      } else {
        query2 = await manager.query(`
        UPDATE personas p SET p.oposicion = ? WHERE p.id_persona = ?
        `, [oposicion, id]);
        res.send(true);
      }
    }else if(oposicion == 0){
      query2 = await manager.query(`
        UPDATE personas p SET p.oposicion = ? WHERE p.id_persona = ?
        `, [oposicion, id]);
        res.send(true);
    }
  };
}
