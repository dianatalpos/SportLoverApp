import { ApiService } from "../../core/services";
import { API_URL, API_PROTOCOL } from "@env";
import { HttpMethod } from "../../core/types/enums";
import { AuthCredentials } from "../types";

export default class AuthService {
    private apiService: ApiService;
    private baseUrl = `${API_PROTOCOL}://${API_URL}/users`;

    constructor() {
        this.apiService = new ApiService();
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
}
