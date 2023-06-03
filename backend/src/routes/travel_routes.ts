import { FastifyInstance } from "fastify";
import { TravelPlans } from "../db/entities/TravelPlans.js";
import { User } from "../db/entities/User.js";
import { ICreateTravelPlan } from "../types.js";
import {Reviews} from "../db/entities/Reviews";

export function TravelPlanRoutesInit(app: FastifyInstance) {

    // Create a new Travel Plan
    app.post<{ Body: ICreateTravelPlan }>("/travelplans", async (req, reply) => {
        const { poster_id, FromlocationCity, FromlocationState, Destination, startDate, endDate, spaceAvailable, cost, requirements } = req.body;

        try {
            const userRepository = req.em.getRepository(User);
            const posterEntity = await userRepository.getReference(poster_id);

            const newTravelPlan = await req.em.create(TravelPlans,{
                poster: posterEntity,
                FromlocationCity,
                FromlocationState,
                Destination,
                startDate,
                endDate,
                spaceAvailable,
                cost,
                requirements
            });

            await req.em.persistAndFlush(newTravelPlan);
            return reply.send(newTravelPlan);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Get all Travel Plans
    app.get("/travelplans", async (req, reply) => {
        try {
            const travelPlans = await req.em.find(TravelPlans, {});
            return reply.send(travelPlans);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Get Travel Plan by ID
    app.get("/travelplans/:id", async (req, reply) => {
        try {
            const travelPlan = await req.em.findOne(TravelPlans, { planid: req.params.id });
            if (!travelPlan) {
                return reply.status(404).send({ message: "Travel plan not found" });
            }
            return reply.send(travelPlan);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Update a Travel Plan by ID
    app.put<{ Body: ICreateTravelPlan }>("/travelplans/:id", async (req, reply) => {
        try {
            const travelPlan = await req.em.findOne(TravelPlans, { planid: req.params.id });
            if (!travelPlan) {
                return reply.status(404).send({ message: "Travel plan not found" });
            }
            Object.assign(travelPlan, req.body);
            await req.em.persistAndFlush(travelPlan);
            return reply.send(travelPlan);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Delete a Travel Plan by ID
    app.delete("/travelplans/:id", async (req, reply) => {
        try {
            const travelPlan = await req.em.findOne(TravelPlans, { planid: req.params.id });
            if (!travelPlan) {
                return reply.status(404).send({ message: "Travel plan not found" });
            }
            await req.em.removeAndFlush(travelPlan);
            return reply.send({ message: "Travel plan deleted successfully" });
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
}
