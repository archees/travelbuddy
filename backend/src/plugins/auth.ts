import dotenv from "dotenv";
dotenv.config();
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { VerifyPayloadType } from "@fastify/jwt";
import fp from "fastify-plugin";

declare module "fastify" {
    interface FastifyRequest {
        jwtVerify(): Promise<VerifyPayloadType>;
    }
    interface FastifyInstance {
        auth(): void;
    }
}

export const AuthPlugin = fp(async function (app: FastifyInstance, opts: FastifyPluginOptions) {
    app.register(import("fastify-auth0-verify"), {
        domain: process.env.AUTH_DOMAIN,
        secret: process.env.AUTH_CLIENT_SECRET,
    });

/*
    fastify.register(require('fastify-auth0-verify'), {
        domain: config.authprovider.domain,
        secret: config.authprovider.secret
    });
*/

    app.decorate("auth", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
            console.log("user token verified");
        } catch (err) {
            reply.send(err);
        }
    });
});
