import { ApiService } from "../../core/services";
import { API_URL } from "@env";
import { HttpMethod } from "../../core/types/enums";
import { AuthCredentials } from "../types";

export default class AuthService {
    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    login(credentials: AuthCredentials): Promise<any> {
        const url = `${API_URL}/login`;
        return this.apiService.performRequest(
            url,
            HttpMethod.POST,
            credentials,
            false
        );
    }

    register(credentials: AuthCredentials): Promise<any> {
        const url = `${API_URL}/register`;
        return this.apiService.performRequest(
            url,
            HttpMethod.POST,
            credentials,
            false
        );
    }
}
