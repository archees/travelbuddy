import { TBBaseEntity } from "./TBBaseEntity.js";
import { User } from "./User.js";
import type {Ref, Rel} from "@mikro-orm/core";
import {Entity, Property, ManyToMany, Collection, ManyToOne, PrimaryKey} from "@mikro-orm/core";


@Entity()
export class TravelPlans extends TBBaseEntity {
    //user who posted
    @ManyToOne('User')
    poster!: Ref<User>;
    //location of travel
    @Property()
    FromlocationCity!: string;
    @Property()
    FromlocationState!:string;
    @Property()
    Destination!:string;
    //travel start date
    @Property()
    startDate!: Date;
    //travel end date
    @Property()
    endDate!: Date;
    //number of people that can join the travel plan
    @Property()
    spaceAvailable!: number;
    //estimated cost per person
    @Property()
    cost!: number;
    //Travel requirements
    @Property()
    requirements?:string;
    //Updates time
    @Property()
    updates_at?:Date;
    //if post is deleted
    @Property({ nullable: true })
    delete_at?: Date;

}
