import { CrudRepository } from "../../shared";
import { Profile, ProfileDTO } from "../types";

export class ProfileService extends CrudRepository<Profile, ProfileDTO> {
    protected endpoint(userId: string): string {
        return `${userId}/profile`;
    }
}
