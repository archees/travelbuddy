import { FastifyInstance } from "fastify";
import { TravelPlans } from "../db/entities/TravelPlans.js";
import { User } from "../db/entities/User.js";
import { ICreateTravelPlan } from "../types.js";

export function TravelPlanRoutesInit(app: FastifyInstance) {

    // Create a new Travel Plan
    app.post<{ Body: ICreateTravelPlan }>("/travelplans", { onRequest: [app.auth] }, async (req, reply) => {
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
    app.search<{ Body: {FromlocationState:string} }>("/travelplans/location", async (req, reply) => {
        const FromlocationState=req.body;
        try {
            const travelPlans = await req.em.find(TravelPlans, FromlocationState);
            return reply.send(travelPlans);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Get Travel Plan by ID
    app.search<{ Body: { id: number } }>("/travelplans/:id", async (req, reply) => {
        const { id } = req.params;
        try {
            const travelPlan = await req.em.findOneOrFail(TravelPlans, id, { strict: true });
            if (!travelPlan) {
                return reply.status(404).send({ message: "Travel plan not found" });
            }
            return reply.send(travelPlan);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Update a Travel Plan by ID
    app.put<{ Params: { id: number }; Body: ICreateTravelPlan }>("/travelplans/:id", async (req, reply) => {
        const { id } = req.params;
        try {
            const travelPlan = await req.em.findOneOrFail(TravelPlans, id, { strict: true });
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
    //get travelplans of a poster
 /*   app.get<{ Body: { poster: number } }>("/travelplans/user/poster", async (req, reply) => {
        const { poster } = req.params;
        try {
            const userRepository = req.em.getRepository(User);
            const user = await userRepository.findOne({ name: poster });
            if (!user) {
                return reply.status(404).send({ message: "User not found" });
            }

            const travelPlans = await req.em.find(TravelPlans, { poster: user });
            return reply.send(travelPlans);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });*/

    // Delete a Travel Plan by ID
    app.delete<{ Body: { planid: number } }>("/travelplans/:id", async (req, reply) => {
        const {planid}=req.body
        try {
            const travelPlan = await req.em.findOneOrFail(TravelPlans, planid,{strict: true});
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
