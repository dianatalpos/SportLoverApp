import { ApiService, StorageService } from "../../core/services";
import { HttpMethod, StorageKeys } from "../../core/types/enums";
import { AuthCredentials } from "../types";

export default class AuthService {
    private apiService: ApiService;
    private storage: StorageService;
    constructor() {
        this.apiService = new ApiService();
        this.storage = new StorageService();
    }

    login(credentials: AuthCredentials): Promise<any> {
        const url = `login`;
        return this.apiService.performRequest(
            url,
            HttpMethod.POST,
            credentials,
            false
        );
    }

    register(credentials: AuthCredentials): Promise<any> {
        const url = `register`;
        return this.apiService.performRequest(
            url,
            HttpMethod.POST,
            credentials,
            false
        );
    }

    async logout(): Promise<void> {        
        await this.storage.removeItem(StorageKeys.TOKEN);
    }
}
