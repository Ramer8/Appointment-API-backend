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

  //   @Column({ name: "appointment_date" })
  //   appointmentDate!: number

  @OneToMany(() => Appointment, (meet) => meet.service)
  appointments!: Appointment[]
  //   @ManyToOne(() => Appointment, (appointment) => appointment.service)
  //   appointment!: Appointment
}
