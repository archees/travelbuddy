import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { MessageSeeder } from "./MessageSeeder.js";
import {UserSeeder} from "./UserSeeder.js";
import {TravelPlansSeeder} from "./TravelPlansSeeder.js";
import {ReviewsSeeder} from "./ReviewsSeeder.js";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [
			UserSeeder,
			MessageSeeder,
			ReviewsSeeder,
			TravelPlansSeeder
		]);
	}
}
