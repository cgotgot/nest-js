import { Column, Entity } from "typeorm";

@Entity()
export class Photo {
  @Column()
  photo: string;
}
