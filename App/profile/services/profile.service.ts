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

    uploadImage(userId:string, image: any): Promise<any>{


        return this.apiService.performRequest(
            this.endpoint()  + "/upload/" + userId,
            HttpMethod.POST,
            image,
            "multipart/form-data",
        )
    } 

    searchProfile(email: string, id: string): Promise<Profile> {
        return this.apiService.performRequest(
            this.endpoint() + "?email=" + email + "&id=" + id);
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
