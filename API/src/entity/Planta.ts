import { Entity, PrimaryGeneratedColumn, Unique, Column, Double, Timestamp } from 'typeorm';

@Entity()
// @Unique(['legajo'])
export class Valores {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar",{ length:256})
  Ingreso: Double;

  @Column("varchar",{ length:11})
  Egreso1: Double;

  @Column("varchar",{ length:256})
  Egreso2: Double;

  @Column("varchar",{ length:256})
  Turbidez: Double;

  @Column("varchar",{ length:512})
  PH: Double;

  @Column("varchar",{ length:512})
  Clorimetro: Double;

  @Column("varchar",{ length:512})
  Cisterna: Double;

  @Column("varchar",{ length:512})
  Presion: Double;

  @Column("varchar",{ length:512})
  Bomba: any;

  @Column("varchar",{ length:512})
  fecReal: Timestamp;

  @Column("varchar",{ length:512})
  TIME: Timestamp;

}
