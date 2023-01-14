import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';

@Entity()
// @Unique(['legajo'])
export class Personas {

  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column("varchar",{ length:256})
  nombre_completo: string;

  @Column("varchar",{ length:11})
  genero: string;

  @Column("varchar",{ length:256})
  dni: string;

  @Column("varchar",{ length:256})
  tipo_dni: string;

  @Column("varchar",{ length:512})
  direccion: string;

  @Column("varchar",{ length:512})
  barrio: string;

  @Column()
  oposicion: number;

}
