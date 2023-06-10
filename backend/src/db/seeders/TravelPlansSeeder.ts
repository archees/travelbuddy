import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { TravelPlans } from "../entities/TravelPlans.js";
import {User} from "../entities/User.js";

export class TravelPlansSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {

        const TPRepo = em.getRepository(TravelPlans);

        // https://mikro-orm.io/docs/seeding#shared-context

        TPRepo.create({
            poster: context.user1,
            FromlocationCity: "Los Angeles",
            FromlocationState: "California",
            Destination: "Paris",
            startDate: "2024-01-01",
            endDate: "2024-02-02",
            spaceAvailable: 2,
            cost: 250,
            requirements: "Bring your own camping tents",
        });

        TPRepo.create({
            poster: context.user1,
            FromlocationCity: "New York City",
            FromlocationState: "New York",
            Destination: "Dubai",
            startDate: "2024-02-23",
            endDate: "2024-03-24",
            spaceAvailable: 4,
            cost: 120,
            requirements: "Bring your own skiing equipment",
        });

        TPRepo.create({
            poster: context.user2,
            FromlocationCity: "Houston",
            FromlocationState: "Texas",
            Destination: "London",
            startDate: "2024-03-15",
            endDate: "2024-03-22",
            spaceAvailable: 3,
            cost: 230,
            requirements: "No specific requirements",
        });

        TPRepo.create({
            poster: context.user2,
            FromlocationCity: "Miami",
            FromlocationState: "Florida",
            Destination: "Tokyo",
            startDate: "2024-04-10",
            endDate: "2024-04-20",
            spaceAvailable: 3,
            cost: 230,
            requirements: "Bring your own snorkeling gear",
        });

        TPRepo.create({
            poster: context.user3,
            FromlocationCity: "Phoenix",
            FromlocationState: "Arizona",
            Destination: "Sydney",
            startDate: "2024-05-01",
            endDate: "2024-05-10",
            spaceAvailable: 6,
            cost: 240,
            requirements: "No specific requirements",
        });

        TPRepo.create({
            poster: context.user3,
            FromlocationCity: "Denver",
            FromlocationState: "Colorado",
            Destination: "Cancun",
            startDate: "2024-06-15",
            endDate: "2024-06-25",
            spaceAvailable: 1,
            cost: 300,
            requirements: "Bring your own scuba diving equipment",
        });

        TPRepo.create({
            poster: context.user4,
            FromlocationCity: "Seattle",
            FromlocationState: "Washington",
            Destination: "Rome",
            startDate: "2024-07-10",
            endDate: "2024-07-20",
            spaceAvailable: 2,
            cost: 800,
            requirements: "No specific requirements",
        });

        TPRepo.create({
            poster: context.user4,
            FromlocationCity: "Chicago",
            FromlocationState: "Illinois",
            Destination: "Amsterdam",
            startDate: "2024-08-05",
            endDate: "2024-08-15",
            spaceAvailable: 4,
            cost: 104,
            requirements: "Bring your own hiking boots",
        });

        TPRepo.create({
            poster: context.user1,
            FromlocationCity: "Atlanta",
            FromlocationState: "Georgia",
            Destination: "Bali",
            startDate: "2024-09-01",
            endDate: "2024-09-10",
            spaceAvailable: 4,
            cost: 450,
            requirements: "No specific requirements",
        });

        TPRepo.create({
            poster: context.user1,
            FromlocationCity: "Honolulu",
            FromlocationState: "Hawaii",
            Destination: "Maldives",
            startDate: "2024-10-15",
            endDate: "2024-10-25",
            spaceAvailable: 3,
            cost: 340,
            requirements: "Bring your own beach towels",
        });


    }
}
