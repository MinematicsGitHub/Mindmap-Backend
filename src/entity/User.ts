import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity()
export class UserDetails extends BaseEntity {

  @PrimaryGeneratedColumn()
  userId: number;
  
  @Column({nullable: true })
  userName: string;

  @Column({nullable: true })
  password: string;

  @Column({nullable: true })
  designation: string;

  @Column({nullable: true })
  phoneno: string;

  @Column({nullable: true })
  email: string;

  @Column({nullable: true })
  roleId: number;

  @CreateDateColumn()
  DateTime: Date;

}
