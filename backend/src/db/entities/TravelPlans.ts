import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { User } from "./User.js";
import {Entity, Property, ManyToOne, ManyToMany, Collection} from "@mikro-orm/core";


@Entity()
export class TravelPlans extends DoggrBaseEntity {
    @Property()
    planid:number;
    //location of travel
    @Property()
    location!: string;
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
    @ManyToMany(() => User)
    groupMembers = new Collection<User>(this);

}
