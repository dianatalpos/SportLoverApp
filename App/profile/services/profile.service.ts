import { HttpMethod } from "../../core/types";
import { CrudRepository } from "../../shared";
import { Profile, ProfileDTO } from "../types";

export default class ProfileService extends CrudRepository<
    Profile,
    Profile
> {
    protected endpoint(): string {
        return `profiles`;
    }

    searchProfile(email: string): Promise<Profile> {
        return this.apiService.performRequest(this.urlDetails(email));
    }

    addFriend(profile: Profile): Promise<any> {
        const payload = {
            to: profile.id,
        };
        return this.apiService.performRequest(
            this.urlDetails(),
            null,
            HttpMethod.PUT,
            payload
        );
    }
}
