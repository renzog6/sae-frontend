# Lo Que Falta para Estandarizar Completamente `sae-frontend/lib/api`

## Inconsistencias Persistentes

### 1. Construcción de Queries

- ✅ **Estandarizado**: `users.ts`, `brands.service.ts`, `companies.service.ts`, `persons.ts`, `employees.service.ts`
- ❌ **Manual**: `contacts.ts`, `locations.ts` (usan `URLSearchParams` directamente)

### 2. Estilo de Exports en index.ts

- ✅ **Estandarizado**: `companies/index.ts`, `employees/index.ts`, `tires/index.ts` (usan `export *`)
- ❌ **Inconsistente**: `catalogs/index.ts` (usa exports nombrados)

### 3. Manejo de Errores

- ❌ **Logging inconsistente**: Algunos servicios loggean errores, otros no
- ❌ **Try-catch no uniforme**: Wrapping de errores variable
- ❌ **Mensajes de error**: Contenido y formato variables

### 4. Estructura de Clases

- ❌ **Métodos de compatibilidad**: `companies.service.ts` tiene métodos backward compatibility
- ❌ **Paths base**: Algunos servicios tienen paths inconsistentes

### 5. Nombres de Métodos

- ❌ **No estandarizados**: Mezcla de `getById`, `getCityById`, etc.

### 6. Retornos de Métodos

- ✅ **Items individuales**: Consistente `response.data`
- ✅ **Listas**: Consistente `response.data` (aunque podría retornar `PaginatedResponse<T>` completo)

## Recomendaciones de Estandarización Adicional

### 3. Manejo de Errores Estandarizado

- Crear utilidad común para try-catch con logging consistente
- Implementar logger centralizado
- Estandarizar formato de mensajes de error

### 4. Base Service Class

Implementar clase base abstracta que incluya:

- Métodos CRUD estándar
- Manejo de errores consistente
- Logging automático
- Paths base consistentes

### 6. Documentación

- Agregar JSDoc consistente en todos los métodos
- Crear guías de uso y mejores prácticas
- Documentar patrones de error handling

## Plan de Implementación Completo

### Fase 1 (Completada)

- ✅ Estandarizar tipos de respuesta → `ApiResponse<T>`

### Fase 2: Unificar Query Building

- Migrar servicios restantes a `QueryBuilder`
- Remover código duplicado de construcción manual

### Fase 3: Crear Base Service Class

- Diseñar clase base con métodos CRUD
- Refactorizar servicios existentes para heredar de la base
- Asegurar consistencia en firmas y comportamientos

### Fase 4: Estandarizar Error Handling

- Implementar sistema de logging centralizado
- Crear decoradores o utilidades para manejo uniforme de errores
- Actualizar todos los servicios

### Fase 5: Limpiar y Optimizar

- Remover métodos obsoletos
- Estandarizar exports
- Limpiar nombres de métodos

### Fase 6: Documentación y Testing

- Agregar documentación completa
- Crear tests para validar consistencia
- Actualizar README con guías de uso
