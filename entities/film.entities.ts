import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";

@Entity("films")
class Films {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  gender: string;

  @Column({ type: "interval" })
  duration: number;

  @Column({ type: "integer" })
  launch_year: number;

  @Column({ length: 500 })
  synopsis: string;

  @ManyToOne(() => User, { eager: true })
  user: User;
}

export { Films };
