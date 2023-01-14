import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';

@Entity()
// @Unique(['legajo'])
export class Colegios {

  @PrimaryGeneratedColumn()
  id_colegio: number;

  @Column("varchar",{ length:256})
  nombre_colegio: string;

}
