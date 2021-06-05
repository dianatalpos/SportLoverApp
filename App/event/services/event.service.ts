import { CrudRepository } from "../../shared";
import { Event, EventDTO } from "../types";

export default class EventService extends CrudRepository<Event, EventDTO> {
    protected endpoint(): string {
        return `events`;
    }
}
