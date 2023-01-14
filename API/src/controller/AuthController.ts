import { getRepository, getManager } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';


class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const manager = getManager();
    if (!(username)) {
      return res.status(200).json({ message: 'incorrecto' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (e) {
      return res.status(200).json({ message: 'incorrecto' });
    }


if(user.role=="sin rol"){
  return res.status(200).json({ message: 'sin rol'});
}


     if(user.password===""){
      return res.status(200).json({ message: 'blanco', username: user.username, id: user.id });
     }
    //Check password
    if (!user.checkPassword(password)) {
      return res.status(200).json({ message: 'incorrecto' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '3h' });
    const refreshToken = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecretRefresh, { expiresIn: '86400' });

    user.refreshToken = refreshToken;

    try {
      await userRepository.save(user);
    } catch (error) {
      return res.status(400).json({message: 'mal'})
    }
    res.json({ message: 'OK', token, refreshToken, userId: user.id, role: user.role, username: user.username, id_persona: user.id_persona });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: 'Somenthing goes wrong!' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old Password' });
    }

    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ message: 'Password change!' });
  };

  static nwpass = async (req: Request, res: Response) => {
    const { password, id } = req.body;
    if (!(password)) {
      res.status(400).json({ message: 'Debe completar los campos' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(id)
    } catch (e) {
      //res.status(400).json({ message: 'No se encontro el usuario' });
    }


    user.password = password;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      //return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.status(200).json({ message: 'exito' });
  };


  static refreshToken = async (req:Request, res:Response) =>{

    const refreshToken = req.headers.refresh as string;

    if(!(refreshToken)){
      res.status(400).json({message:'mal'})
    }

    const userRepository = getRepository(Users)
    let user:Users;

    try {
      const verifyResult = jwt.verify(refreshToken, config.jwtSecretRefresh)
      const {username} = verifyResult as Users;
      user = await userRepository.findOneOrFail({where: {username}})
    } catch (error) {
      res.status(400).json({message:error})
    }


    const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, {expiresIn: '120'})
    res.json({message: 'OK', token})
  }
  }

export default AuthController;
