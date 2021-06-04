import { ApiService, StorageService } from "../../core/services";
import { HttpMethod, StorageKeys } from "../../core/types/enums";
import { AuthCredentials } from "../types";

export default class AuthService {
    private apiService: ApiService;
    private baseUrl = `users`;
    private storage: StorageService;
    constructor() {
        this.apiService = new ApiService();
        this.storage = new StorageService();
    }

    login(credentials: AuthCredentials): Promise<any> {
        const url = `${this.baseUrl}/login`;

        return this.apiService.performRequest(
            url,
            HttpMethod.POST,
            credentials,
            false
        );
    }

    register(credentials: AuthCredentials): Promise<any> {
        const url = `${this.baseUrl}/register`;
        return this.apiService.performRequest(
            url,
            HttpMethod.POST,
            credentials,
            false
        );
    }

    logout(): void {
        this.storage.removeItem(StorageKeys.TOKEN);
    }
}
