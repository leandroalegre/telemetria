import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsOptional} from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_persona: number;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @Column()
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsOptional()
  refreshToken:string

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
