import { HttpMethod } from "../../core/types";
import { CrudRepository } from "../../shared";
import { Location, LocationDTO } from "../types";

export default class LocationService extends CrudRepository<Location, LocationDTO> {
    protected endpoint(): string {
        return `locations`;
    }

    getFields(locationId: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(locationId) + "/fields",
            HttpMethod.GET
        )
    }
}
