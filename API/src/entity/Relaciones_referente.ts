import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';

@Entity()
// @Unique(['legajo']) 
export class Relaciones_referente {

  @PrimaryGeneratedColumn()
  id_relacion_referente: number;

  @Column()
  id_persona: number;

  @Column()
  id_persona_referente: number;

}
