import { HttpMethod, StorageKeys } from "../types/enums";
import { API_URL, API_PROTOCOL } from "@env";
import { StorageService } from ".";

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
    let requestUrl = `${API_PROTOCOL}://${API_URL}/${url}`;

    const storage = new StorageService();
    const token = await storage.getItem(StorageKeys.TOKEN);
    const headers = this.getHeaders(contentType, accept, withToken, token);
    const options = this.getOptions(method, headers);

    if (body) {
      options["body"] = JSON.stringify(body);
    }
    if (queryParams) {
      const params = this.parseParams(queryParams);
      requestUrl = requestUrl + params;
    }
    return fetch(requestUrl, options).then(this.handleRequestStatus);
  }

  private parseParams(queryParams: any): string {
    const queryKeys = Object.keys(queryParams);
    if (queryKeys.length > 0) {
      const params = queryKeys
        .map((key) =>
          !!queryParams[key] ? `${key}=${queryParams[key]}` : null
        )
        .filter((param) => !!param);
      return `?${params.join("&")}`;
    }
    return "";
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

  private async handleRequestStatus(response: Response) {
    if (response.ok) {
      return response.json();
    }

    if ([401, 403].includes(response.status)) {
      const storage = new StorageService();
      await storage.removeItem(StorageKeys.ID);
      await storage.removeItem(StorageKeys.TOKEN);
      await storage.removeItem(StorageKeys.ROLES);
      return response.json().then((error) => Promise.reject(error));
    }
  }
}
