import {Entity, Property, ManyToOne } from "@mikro-orm/core";
import type {Rel} from "@mikro-orm/core";
import { TBBaseEntity } from "./TBBaseEntity.js";
import { User } from "./User.js";
import {SoftDeletable} from "mikro-orm-soft-delete";

@SoftDeletable(() => Reviews, "deleted_at", () => new Date())
@Entity()
export class Reviews extends TBBaseEntity{

    @ManyToOne('User')
    reviewer!: Rel<User>;

    @ManyToOne()
    user!: Rel<User>;

    @Property()
    rating!: number;

    @Property()
    comment!: string;

    @Property()
    updated?:Date;

}
