import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Service } from "./Service"
@Entity("appointments")
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: "appointment_date" })
  appointmentDate!: Date

  @Column({ name: "user_id" })
  userId!: number

  @Column({ name: "service_id" })
  serviceId!: number

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: "service_id" })
  service!: Service
  //   @OneToMany(() => Service, (service) => service.appointment)
  //   @JoinColumn({ name: "service_id" }) //campo personalizado a la bd
  //   service!: Service[]
}
