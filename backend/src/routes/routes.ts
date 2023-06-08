import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import { MessageRoutesInit } from "./message_routes.js";
import { UserRoutesInit } from "./user_routes.js";
import { ReviewsRoutesInit } from "./review_routes.js";
import {TravelPlanRoutesInit} from "./travel_routes.js";


/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all of the initialized routes
 */
async function TBRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	UserRoutesInit(app);
	MessageRoutesInit(app);
	ReviewsRoutesInit(app);
	TravelPlanRoutesInit(app);
}

export default TBRoutes;
