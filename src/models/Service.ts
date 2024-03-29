import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

import { Appointment } from "./Appointment"

@Entity("services")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "service_name" })
  serviceName!: string

  @Column({ name: "description" })
  description!: string

  @Column({ name: "service_image" })
  image!: string

  @OneToMany(() => Appointment, (meet) => meet.service)
  appointments!: Appointment[]
}
