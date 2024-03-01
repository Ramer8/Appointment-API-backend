import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Service } from "./Service"

@Entity("appointment")
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "appointment_date" })
  appointmentDate!: string

  @Column({ name: "service_id" })
  serviceId!: number

  @Column({ name: "user_id" })
  userId!: number

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: "service_id" })
  service!: Service
}
