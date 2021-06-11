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
      const params = encodeURIComponent(queryParams);
      requestUrl = requestUrl + params;
    }
    return fetch(requestUrl, options).then(this.handleRequestStatus);
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
    console.log(headers, "HEADERS");
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
