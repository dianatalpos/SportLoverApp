import { CrudRepository } from "../../shared";
import { HttpMethod } from "../../core/types/enums";


export default class FriendService extends CrudRepository<Event, Event> {
    protected endpoint(): string {
        return `friendship`;
    }

    getFriendsRequests(userId: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId) + "/all",
            HttpMethod.POST
        );
    }

}
