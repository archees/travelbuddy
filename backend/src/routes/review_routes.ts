import { FastifyInstance } from "fastify";
import { Reviews } from "../db/entities/Reviews.js";
import { User } from "../db/entities/User.js";
import { ICreateReview } from "../types.js";

export function ReviewsRoutesInit(app: FastifyInstance) {
    // Create a new review
    app.post<{ Body: ICreateReview }>("/reviews", async (req, reply) => {
        const { rating, comment, user_id } = req.body;

        try {
            // Retrieve the user entity associated with the review
            const userRepository = req.em.getRepository(User);
            const user = await userRepository.findOneOrFail(user_id);

            // Create the new review
            const newReview = await req.em.create(Reviews, {
                rating,
                comment,
                user,
            });

            // Send the changes to the database
            await req.em.flush();

            // Let the user know everything went fine
            return reply.send(newReview);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Get all reviews
    app.get("/reviews", async (req, reply) => {
        try {
            const reviews = await req.em.find(Reviews, {});

            return reply.send(reviews);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Get a specific review by its ID
    app.get<{ Params: { id: number } }>("/reviews/:id", async (req, reply) => {
        const { id } = req.params;

        try {
            const review = await req.em.findOneOrFail(Reviews, id);

            return reply.send(review);
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });

    // Update a specific review
    app.put<{ Params: { id: number }; Body: Partial<ICreateReview> }>(
        "/reviews/:id",
        async (req, reply) => {
            const { id } = req.params;
            const { rating, comment, user_id } = req.body;

            try {
                const review = await req.em.findOneOrFail(Reviews, id);

                if (rating) {
                    review.rating = rating;
                }

                if (comment) {
                    review.comment = comment;
                }

                if (user_id) {
                    const userRepository = req.em.getRepository(User);
                    const user = await userRepository.findOneOrFail(user_id);
                    review.user = user;
                }

                await req.em.flush();

                return reply.send(review);
            } catch (err) {
                return reply.status(500).send({ message: err.message });
            }
        }
    );

    // Delete a specific review
    app.delete<{ Params: { id: number } }>("/reviews/:id", async (req, reply) => {
        const { id } = req.params;

        try {
            const review = await req.em.findOneOrFail(Reviews, id);

            await req.em.removeAndFlush(review);

            return reply.send();
        } catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
}
