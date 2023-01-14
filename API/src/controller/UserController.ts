
import { Users } from './../entity/Users';
import { getRepository, getManager } from 'typeorm';
import { Request, Response, request } from 'express';
import { validate } from 'class-validator';

export class UserController {
  static getAll = async (req: Request, res: Response) => {


  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {

  };

  static buscarExistente = async (req:Request, res:Response) =>{
    const {dni}=req.params

    const userRepository = getRepository(Users)

    try {
       await userRepository.findOneOrFail({where: {username: dni}});
        res.send(true)
    } catch (error) {
       res.send(false)
    }


  }

  static getUsers = async (req:Request, res:Response) => {

    const manager = getManager();
    let usuarios;

    usuarios = await manager.query(`SELECT u.*, p.nombre_completo FROM users u, personas p where p.id_persona=u.id_persona`);

    if (usuarios.length > 0) {
      res.send(usuarios);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  }

  static edit = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { username, role } = req.body;

    const userRepository = getRepository(Users);
    // Try get user
    try {
      user = await userRepository.findOneOrFail(id);
      user.username = username;
      user.role = role;
    } catch (e) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);

    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    res.status(200).json({ message: 'actualizado' });
  };



  static blanquear = async (req:Request, res:Response)=>{
    const {id} = req.params
    const {password} = req.body

   const userRepository = getRepository(Users)
   let user;


     user= await userRepository.findOneOrFail({where: {id: id}});
     if(user.password==''){
      res.status(200).json({ message: 'vacia' });
     }else{
     user.password=password


   const validationOpt = { validationError: { target: false, value: false } };
   const errors = await validate(user, validationOpt);

   if (errors.length > 0) {
     return res.status(400).json(errors);
   }

   try {
    await userRepository.save(user);
  } catch (e) {
    return res.status(401).json({ message: 'error' });
  }

  res.status(200).json({ message: 'actualizado' });
}
  }

}

export default UserController;
