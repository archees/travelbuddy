import { httpClient } from "@/Services/HttpClient.tsx";

export const ReviewsService = {
    async send(user_id:number) {
        return httpClient.search("/travelplans/location", { user_id:user_id});
    }
};
