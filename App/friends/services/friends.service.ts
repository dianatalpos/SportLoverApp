import { CrudRepository } from "../../shared";
import { HttpMethod } from "../../core/types/enums";
import { Friend } from "../types";


export default class FriendService extends CrudRepository<Event, Event> {
    protected endpoint(): string {
        return `friendship`;
    }

    getFriendsRequests(userId: string): Promise<any> {
        return this.apiService.performRequest(
            this.endpoint() + "/requests/" + userId,
            HttpMethod.GET
        );
    }

    acceptFriendRequest(userId: string, friend: Friend): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId) + "/accept",
            HttpMethod.POST,
            friend
        )
    }

    sendFriendRequest(userId: string, friend: Friend): Promise<any>{
        return this.apiService.performRequest(
            this.urlDetails(userId),
            HttpMethod.POST,
            friend
        )
    }
}
