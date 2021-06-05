import { HttpMethod, StorageKeys } from "../types/enums";
import { API_URL, API_PROTOCOL } from "@env";
import { StorageService } from ".";

export default class ApiService {
    async performRequest(
        url: string,
        method = HttpMethod.GET,
        body: any = null,
        withToken = true,
        contentType = "application/json",
        accept = "application/json"
    ) {
        const storage = new StorageService();
        const requestUrl = `${API_PROTOCOL}://${API_URL}/${url}`;

        const token = await storage.getItem(StorageKeys.TOKEN);
        const headers: any = {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
            Accept: accept,
        };
        const options: any = {
            method,
            headers,
        };

        if (withToken) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        if (body) {
            options["body"] = JSON.stringify(body);
        }

        return fetch(requestUrl, options).then(this.handleRequestStatus).catch(err => console.log(err, 'errrrr'));
    }

    private handleRequestStatus(response: Response) {
        if (response.ok) {
            return response.json();
        }

        if ([401, 403].includes(response.status)) {
            return response.json().then((error) => Promise.reject(error));
        }
    }
}
