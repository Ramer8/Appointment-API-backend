
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!:number

  @Column({name: 'first_name'})
  firstName!: string

  @Column({name: 'last_name'})
  lastName!: string
 
  @Column({name: 'email'})
  email!: string

  @Column({name: 'password_hash'})
  password!: string

  @Column({name: 'created_at'})
  createdAt!: Date

  @Column({name: 'role_id'})
  roleId!: number

//verificar las relaciones con user y roles

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn ({ name: "role_id" })
  role!: Role;
}
