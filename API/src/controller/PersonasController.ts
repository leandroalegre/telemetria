
import { Users } from './../entity/Users';
import { getRepository, getManager } from 'typeorm';
import { Request, Response, request } from 'express';
import { validate } from 'class-validator';
import { Personas } from '../entity/Personas';
import { Relaciones_voto } from '../entity/Relaciones_voto';

export class PersonasController {

  static findPersonbyDNI = async (req:Request, res:Response)=>{

    const {dni} = req.params;
    const personasRepository = getRepository(Personas)
    let persona
    try {
      persona = await personasRepository.findOneOrFail({where:{dni:dni}})
    } catch (error) {
      res.send(false)
    }

    res.send(persona)
  }


  static verificarVoto = async (req:Request, res:Response)=>{
    const {id_persona} = req.params;
    const relacionesVotoRepo = getRepository(Relaciones_voto)
    let voto
    try {
      voto = await relacionesVotoRepo.findOneOrFail({where:{id_persona:id_persona}})
    } catch (error) {
      res.send(false)
    }

    res.send(voto)
  }


  static confirmarVoto = async (req:Request, res:Response)=>{
    const {id_persona, userId} = req.params;
    const relacionesVotoRepo = getRepository(Relaciones_voto)
    let voto
    try {
      voto = await relacionesVotoRepo.findOneOrFail({where:{id_persona:id_persona}})
      voto.estado_voto=1
      voto.fecha_hora=new Date().toLocaleString('en-GB', {
        timeZone: 'America/Argentina/Cordoba'
      });;
      voto.id_user=userId
    } catch (error) {
      res.send(false)
    }

    try {
        await relacionesVotoRepo.save(voto);
    } catch (error) {
      res.send(false)
    }

    res.send(true)
  }


  static getPersonaYRol = async (req: Request, res: Response) => {
    const { userId } = req.params
    const manager = getManager();
    let personas;

    personas = await manager.query(`SELECT u.role, p.nombre_completo, p.dni FROM users u, personas p where u.id_persona=p.id_persona`, [userId]);

    if (personas.length > 0) {
      res.send(personas);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }

  };

  static getReferentes = async (req:Request, res:Response) => {

    const manager = getManager();
    let referentes;

    referentes = await manager.query(`SELECT p.id_persona,p.nombre_completo, p.dni FROM relaciones_referente rr, personas p where rr.id_persona_referente=p.id_persona group by rr.id_persona_referente`);

    if (referentes.length > 0) {
      res.send(referentes);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  }

  static getReferenteUser = async (req:Request, res:Response) => {
    const {id_persona} = req.params
    const manager = getManager();
    let referentes;

    referentes = await manager.query(`SELECT p.id_persona,p.nombre_completo, p.dni FROM relaciones_referente rr, personas p where rr.id_persona_referente=p.id_persona and p.id_persona=? group by p.id_persona`, [id_persona]);

    if (referentes.length > 0) {
      res.send(referentes);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  }


  static getVotoPadron = async (req:Request, res:Response) => {

    const manager = getManager();
    let referenciados;

    referenciados = await manager.query(`SELECT p.nombre_completo, p.dni, rv.estado_voto FROM relaciones_referente rr, personas p, relaciones_voto rv where rr.id_persona=p.id_persona and rv.id_persona=p.id_persona`);

    if (referenciados.length > 0) {
      res.send(referenciados);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  }



  static getVotosByReferentes = async (req:Request, res:Response) => {
    const {id_persona} = req.params
    const manager = getManager();
    let referentesvotos;

    referentesvotos = await manager.query(`SELECT rr.id_persona_referente, p.nombre_completo, (SELECT COUNT(estado_voto) FROM relaciones_referente rr, relaciones_voto rv where rr.id_persona_referente=? and rr.id_persona=rv.id_persona and rv.estado_voto=1) as votaron, (SELECT COUNT(estado_voto) FROM relaciones_referente rr, relaciones_voto rv where rr.id_persona_referente=? and rr.id_persona=rv.id_persona and rv.estado_voto=0) as novotaron FROM relaciones_referente rr, relaciones_voto rv, personas p where rr.id_persona_referente=? and rr.id_persona=rv.id_persona and rr.id_persona_referente=p.id_persona group by rr.id_persona_referente`, [id_persona, id_persona, id_persona]);

    if (referentesvotos.length > 0) {
      res.send(referentesvotos);
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' });
    }
  }

  static getPersonasByReferente = async (req:Request, res:Response) => {
    const {id_persona} = req.params
    const manager = getManager();

    let personas

    personas = await manager.query(`SELECT p.*, rv.estado_voto FROM relaciones_referente rr, personas p, relaciones_voto rv where id_persona_referente=? and p.id_persona=rr.id_persona and p.id_persona=rv.id_persona`, [id_persona])

    if(personas.length > 0){
      res.send(personas)
    }else{
      res.status(400).json({message:'No se encontraron resultados'})
    }
  }

  static getTotalVotos = async (req:Request, res: Response) => {
    const manager = getManager()
    let votos

    try {
      votos = await manager.query(`SELECT COUNT(id_relacion_voto) as total, (SELECT COUNT(id_relacion_voto) from relaciones_voto where estado_voto=1) as voto, (SELECT COUNT(id_relacion_voto) from relaciones_voto where estado_voto=0) as novoto FROM relaciones_voto`);
    } catch (error) {
      res.status(400).json({message:'No se encontraron resultados.'})
    }
    res.send(votos)
  }

  static getTotalVotosOposicion = async (req:Request, res: Response) => {
    const manager = getManager()
    let votos

    try {
      votos = await manager.query(`SELECT COUNT(id_relacion_voto) as total, (SELECT COUNT(id_relacion_voto) from relaciones_voto, personas where estado_voto=1 and personas.oposicion=1 and personas.id_persona=relaciones_voto.id_persona) as voto, (SELECT COUNT(id_relacion_voto) from relaciones_voto, personas where estado_voto=0 and personas.oposicion=1 and personas.id_persona=relaciones_voto.id_persona) as novoto FROM relaciones_voto, personas where personas.oposicion=1 and personas.id_persona=relaciones_voto.id_persona`);
    } catch (error) {
      res.status(400).json({message:'No se encontraron resultados.'})
    }
    res.send(votos)
  }

  static getTotalVotosReferentes = async (req:Request, res: Response) => {
    const manager = getManager()
    let votos

    try {
      votos = await manager.query(`SELECT COUNT(id_relacion_voto) as total, (SELECT COUNT(id_relacion_voto) from relaciones_voto, relaciones_referente where estado_voto=1 and relaciones_voto.id_persona=relaciones_referente.id_persona and relaciones_referente.id_persona_referente>0) as voto, (SELECT COUNT(id_relacion_voto) from relaciones_voto, relaciones_referente where estado_voto=0 and relaciones_voto.id_persona=relaciones_referente.id_persona and relaciones_referente.id_persona_referente>0) as novoto FROM relaciones_voto, relaciones_referente where relaciones_voto.id_persona=relaciones_referente.id_persona and relaciones_referente.id_persona_referente>0`);
    } catch (error) {
      res.status(400).json({message:'No se encontraron resultados.'})
    }
    res.send(votos)
  }


}

export default PersonasController;
