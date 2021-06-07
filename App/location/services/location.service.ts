import { CrudRepository } from "../../shared";
import { Location, LocationDTO } from "../types";

export default class EventService extends CrudRepository<Location, LocationDTO> {
    protected endpoint(): string {
        return `locations`;
    }
}
