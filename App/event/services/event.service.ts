import { CrudRepository } from "../../shared";
import { Event, EventDTO } from "../types";

export default class EventService extends CrudRepository<Event, EventDTO> {
    protected endpoint(eventId: string): string {
        return `${eventId}/events`;
    }
}
