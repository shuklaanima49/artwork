import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;


  @Column()
  passwordHash!: string;


  @Column()
  fullName!: string;


  @CreateDateColumn()
  createdAt!: Date;


  @UpdateDateColumn()
  updatedAt!: Date;


  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[];

}
