import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';

@Entity()
// @Unique(['legajo'])
export class Relaciones_voto {

  @PrimaryGeneratedColumn()
  id_relacion_voto: number;

  @Column()
  id_persona: number;

  @Column()
  id_colegio: number;

  @Column()
  estado_voto: number;

  @Column()
  fecha_hora:string;

  @Column()
  id_user:number

}
