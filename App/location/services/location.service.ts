import { ActivityType } from "./../../event/types/enums/activity-type.enum";
import { HttpMethod } from "../../core/types";
import { CrudRepository } from "../../shared";
import { Field, Location, LocationDTO } from "../types";

export default class LocationService extends CrudRepository<
  Location,
  Location
> {
  protected endpoint(): string {
    return `locations`;
  }

  getFields(locationId: string, type?: ActivityType): Promise<any> {
    return this.apiService.performRequest(
      this.urlDetails(locationId) + "/fields",
      { sport: type },
      HttpMethod.GET
    );
  }

  addField(locationId: string, field: Field): Promise<any> {
    return this.apiService.performRequest(
      this.urlDetails(locationId) + "/fields",
      null,
      HttpMethod.POST,
      field
    );
  }
}
