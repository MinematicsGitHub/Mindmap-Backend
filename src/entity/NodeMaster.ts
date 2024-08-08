import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";
// import { EdgeMaster } from "./EdgeMaster";

@Entity()
export class NodeMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  nodeId: number;
  
  @Column()
  id: string;

  @Column()
  nodeName: string;

  @Column()
  width: string;

  @Column()
  height: string;
  
  @Column()
  xPosition: number;
  
  @Column()
  yPosition: number;
  
  @Column({ nullable: true })
  borderRadius: string;
  // New Column 28-10-23 
  @Column({ nullable: true })
  backgroundColor: string;

  @Column({ nullable: true })
  borderWidth: string;
  
  @Column({ nullable: true })
  borderColor: string;

  @Column({ nullable: true })
  fillColor: string;

  @Column({ nullable: true })
  sourcePosition: string;

  @Column({ nullable: true })
  targetPosition: string;

  @Column({ nullable: true })
  FontColor: string;

  @Column({ nullable: true })
  FontStyle: string;

  @Column({ nullable: true })
  FontSize: string;

  @Column({ nullable: true })
  type: string;

  @Column({nullable: true })
  parentNode:string;
 
  @Column()
  userId: string;

  @CreateDateColumn()
  DateTime: Date

}
