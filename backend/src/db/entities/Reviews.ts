import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Reviews extends DoggrBaseEntity {
    @Property()
    rating!: number;

    @Property()
    comment!: string;

    @ManyToOne(() => User)
    user!: User;

    @Property()
    updated?:Date;
}

