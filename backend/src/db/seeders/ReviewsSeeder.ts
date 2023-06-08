import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Reviews } from "../entities/Reviews.js";
import {User} from "../entities/User.js";

export class ReviewsSeeder extends Seeder {
    async run(em: EntityManager, context: Dictionary): Promise<void> {

        const reviewRepo = em.getRepository(Reviews);

        // https://mikro-orm.io/docs/seeding#shared-context

        reviewRepo.create({
            reviewer: context.user1,
            user: context.user2,
            rating:4.5,
            comment: "Test review 1",
        });
        reviewRepo.create({
            reviewer: context.user2,
            user: context.user1,
            rating:5,
            comment: "Test review 2",
        });
        reviewRepo.create({
            reviewer: context.user3,
            user: context.user2,
            rating:2,
            comment: "Test review 3",
        });
        reviewRepo.create({
            reviewer: context.user1,
            user: context.user3,
            rating:4,
            comment: "Test review 4",
        });
        reviewRepo.create({
            reviewer: context.user2,
            user: context.user3,
            rating:2.4,
            comment: "Test review 5",
        });
        reviewRepo.create({
            reviewer: context.user3,
            user: context.user1,
            rating:3.4,
            comment: "Test review 6",
        });

    }
}
