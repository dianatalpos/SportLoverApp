/**
 * Resource factory service
 * M - Model
 * D - DTO
 */
export default abstract class BaseFactory<M, D> {
    abstract fromDTO(dto: D): M;
}