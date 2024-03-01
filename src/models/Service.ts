import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

import { Appointment } from "./Appointment"

@Entity("service")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "appointment_date" })
  appointmentDate!: string

  @OneToMany(() => Appointment, (meet) => meet.service)
  appointments!: Appointment[]
}
