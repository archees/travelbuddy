import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { TravelPlans } from "../entities/TravelPlans.js";
import {User} from "../entities/User.js";

export class TravelPlansSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {

        const TPRepo = em.getRepository(TravelPlans);

        // https://mikro-orm.io/docs/seeding#shared-context

        TPRepo.create({
            planid:1,
            poster: context.user1,
            FromlocationCity:"xyz",
            FromlocationState:"abc",
            Destination:"paris",
            startDate:"1/1/24",
            endDate:"2/2/24",
            spaceAvailable:2,
            cost:250,
            requirements:"",
        });
        TPRepo.create({
            planid:2,
            poster: context.user1,
            FromlocationCity:"abc",
            FromlocationState:"123",
            Destination:"dubai",
            startDate:"23-2-24",
            endDate:"24-3-24",
            spaceAvailable:4,
            cost:120,
            requirements:"",
        });
        TPRepo.create({
            planid:3,
            poster: context.user2,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:3,
            cost:230,
            requirements:"",
        });
        TPRepo.create({
            planid:4,
            poster: context.user2,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:3,
            cost:230,
            requirements:"",
        });
        TPRepo.create({
            planid:5,
            poster: context.user3,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:6,
            cost:240,
            requirements:"",
        });
        TPRepo.create({
            planid:6,
            poster: context.user3,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:1,
            cost:300,
            requirements:"",
        });
        TPRepo.create({
            planid:7,
            poster: context.user4,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:2,
            cost:800,
            requirements:"",
        });
        TPRepo.create({
            planid:8,
            poster: context.user4,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:4,
            cost:104,
            requirements:"",
        });
        TPRepo.create({
            planid:9,
            poster: context.user1,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:4,
            cost:450,
            requirements:"",
        });
        TPRepo.create({
            planid:10,
            poster: context.user1,
            FromlocationCity:"",
            FromlocationState:"",
            Destination:"",
            startDate:"",
            endDate:"",
            spaceAvailable:3,
            cost:340,
            requirements:"",
        });

    }
}
