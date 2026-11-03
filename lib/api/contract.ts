/**
 * Tipos generados desde el contrato OpenAPI del backend.
 *
 * El contrato vive en `sae-backend/openapi.json` y se regenera con:
 *   backend:   npm run openapi:export
 *   frontend:  npm run openapi:types
 *
 * Uso:
 * ```ts
 * import type { Schemas, Paginated } from "@/lib/api/contract";
 *
 * // payload de alta, tipado desde el contrato
 * const payload: Schemas["CreateCompanyDto"] = { cuit: "...", name: "..." };
 *
 * // respuesta paginada del backend
 * type CompanyPage = Paginated<Schemas["CreateCompanyDto"]>;
 * ```
 *
 * LIMITACIÓN CONOCIDA: el contrato documenta los cuerpos de entrada (Create/Update
 * DTOs) pero todavía no los de respuesta, porque `BaseController.findAll/findOne`
 * no declaran `@ApiOkResponse` con un tipo concreto. Para tipar respuestas hace
 * falta agregar `@ApiOkResponse` por controller (misma mecánica que se usó para
 * tipar create/update).
 */
import type { components, paths } from "./schema";

/** Todos los esquemas del contrato (DTOs de entrada). */
export type Schemas = components["schemas"];

/** Rutas y operaciones del contrato. */
export type ApiPaths = paths;

/** Forma de las respuestas paginadas del backend (`PaginationResponseDto`). */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Envoltorio paginado: `{ data, meta }`. */
export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Envoltorio de un solo recurso: `{ data, message? }`. */
export interface SingleResponse<T> {
  data: T;
  message?: string;
}
