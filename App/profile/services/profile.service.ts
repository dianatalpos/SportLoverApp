import { HttpMethod } from "../../core/types";
import { CrudRepository } from "../../shared";
import { Profile, ProfileDTO } from "../types";

export default class ProfileService extends CrudRepository<
    Profile,
    ProfileDTO
> {
    protected endpoint(): string {
        return `profile`;
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
            HttpMethod.PUT,
            payload
        );
    }
}
