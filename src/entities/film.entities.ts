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

  @Column({ type: "integer" })
  durationInMinutes: number;

  @Column({ type: "integer" })
  launchYear: number;

  @Column({ length: 500 })
  synopsis: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, { eager: true })
  user: User;
}

export { Films };
