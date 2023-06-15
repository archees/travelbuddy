import { httpClient } from "@/Services/HttpClient.tsx";

export const TravelPlansService = {
    async send(FromlocationState:string) {
        return httpClient.search("/travelplans/location", { FromlocationState:FromlocationState});
    }
};
