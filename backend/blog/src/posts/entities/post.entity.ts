import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
