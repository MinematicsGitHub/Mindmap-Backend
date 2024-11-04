import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    // ManyToOne,
    // JoinColumn
  } from "typeorm";
//   import { NodeMaster } from "./NodeMaster"; 
  
  @Entity()
  export class NodeFormula extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    // @ManyToOne(() => NodeMaster, (nodeMaster) => nodeMaster.nodeId)
    // @JoinColumn({ name: 'nodeId' })
    // nodeMaster: NodeMaster;
    
    @Column({nullable: true })
    nodeId:string;

    @Column({nullable: true })
    childnodeid:string;

    @Column({nullable: true })
    childnode:string;
  
    @Column({nullable: true })
    operator:string;

    @Column({nullable: true })
    constant:string;
  
    @Column({nullable: true })
    value:number;
     
    @Column({nullable:true})
    userId: string;
  
    @Column({nullable:true})
    modelid:number;
  
    @CreateDateColumn()
    DateTime: Date
  
  }
  