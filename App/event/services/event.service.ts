import { CrudRepository } from "../../shared";
import { Event, EventDTO } from "../types";
import { HttpMethod } from "../../core/types/enums";


export default class EventService extends CrudRepository<Event, Event> {
    protected endpoint(): string {
        return `events`;
    }

    getEvents(): Promise<any> {
        return this.apiService.performRequest(
            this.endpoint() + "/all",
            HttpMethod.POST
        );
    }

}
