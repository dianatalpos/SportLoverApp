import { ApiService } from "../../core/services";
import { HttpMethod } from "../../core/types/enums";
import BaseFactory from "./base-factory";

/**
 * CRUD Repository is responsible for CRUD operation
 *
 * M - Model
 * D - DTO
 * C - CreateDTO
 * U - UpdateDTO
 */
export default abstract class CrudRepository<M, D, C = D, U = C> {
    private baseFactory: BaseFactory<M, D>;
    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    protected abstract endpoint(): string;

    protected urlDetails(resourceId: string): string {
        return resourceId ? `${this.endpoint()}/${resourceId}` : this.endpoint();
    }

    get(resourceId?: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(resourceId)
        );
    }

    post(resourceId: string, dto: D): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(resourceId),
            HttpMethod.POST,
            dto
        );
    }

    put(resourceId: string, dto: D): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(resourceId),
            HttpMethod.PUT,
            dto
        );
    }

    delete(resourceId: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(resourceId),
            HttpMethod.DELETE
        );
    }
}
