import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
