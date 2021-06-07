import { CrudRepository } from "../../shared";
import { Event, EventDTO } from "../types";
import { HttpMethod } from "../../core/types/enums";


export default class EventService extends CrudRepository<Event, Event> {
    protected endpoint(): string {
        return `events`;
    }

    getEvents(userId: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId) + "/all",
            HttpMethod.POST
        );
    }

    joinEvent(eventId:  string, userId: string) {
        return this.apiService.performRequest(
            this.urlDetails(eventId) + "/join/" + userId,
            HttpMethod.POST 
        );
    }

    getNextEvents(userId: string): Promise<any> {
        return this.apiService.performRequest(
            this.endpoint() + "/next/" + userId,
            HttpMethod.GET
        )
    }

}
