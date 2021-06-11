import { HttpMethod, StorageKeys } from "../types/enums";
import { API_URL, API_PROTOCOL } from "@env";
import { StorageService } from ".";
import { acc } from "react-native-reanimated";

export default class ApiService {
    async performRequest(
        url: string,
        queryParams?: any,
        method = HttpMethod.GET,
        body: any = null,
        withToken = true,
        contentType = "application/json",
        accept = "application/json"
    ) {
        const storage = new StorageService();
        const requestUrl = new URL(`${API_PROTOCOL}://${API_URL}/${url}`);

        const token = await storage.getItem(StorageKeys.TOKEN);
        const headers = this.getHeaders(contentType, accept, withToken, token);
        const options = this.getOptions(method, headers);

        if (body) {
            options["body"] = JSON.stringify(body);
        }

        Object.keys(queryParams).forEach(key => requestUrl.searchParams.append(key, queryParams[key]))

        return fetch(JSON.stringify(requestUrl), options)
            .then(this.handleRequestStatus)
            .catch((err) => console.log(err, "errrrr"));
    }

    private getHeaders(
        contentType: String,
        accept: string,
        withToken: boolean,
        token: string
    ) {
        const headers = {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
            Accept: accept,
        };

        if (withToken) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    }

    private getOptions(method: HttpMethod, headers: any) {
        return {
            method,
            headers,
        };
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
