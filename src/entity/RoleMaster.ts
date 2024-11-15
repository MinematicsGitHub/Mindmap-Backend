import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity()
export class Role_Master extends BaseEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  roleType: string;

  @CreateDateColumn()
  DateTime: Date;


}
