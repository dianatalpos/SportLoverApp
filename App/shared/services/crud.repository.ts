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

    protected abstract endpoint(userId: string): string;

    protected urlDetails(userId: string, resourceId: string): string {
        return `${this.endpoint(userId)}/${resourceId}`;
    }

    get(userId: string, resourceId: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId, resourceId)
        );
    }

    post(userId: string, resourceId: string, dto: D): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId, resourceId),
            HttpMethod.POST,
            dto
        );
    }

    put(userId: string, resourceId: string, dto: D): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId, resourceId),
            HttpMethod.PUT,
            dto
        );
    }

    delete(userId: string, resourceId: string): Promise<any> {
        return this.apiService.performRequest(
            this.urlDetails(userId, resourceId),
            HttpMethod.DELETE
        );
    }
}
