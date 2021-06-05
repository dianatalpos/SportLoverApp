import { CrudRepository } from "../../shared";
import { Profile, ProfileDTO } from "../types";

export default class ProfileService extends CrudRepository<Profile, ProfileDTO> {
    protected endpoint(): string {
        return `profile`;
    }
}
