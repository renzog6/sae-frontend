# Guía de Desarrollo - SAE Frontend

## Estándares de API

### Formato de Respuestas

Todas las respuestas de la API deben seguir el formato estandarizado:

#### Respuestas Individuales

```typescript
// ✅ CORRECTO
{
  data: T; // El objeto individual
}

// ❌ INCORRECTO
T; // Objeto directo
```

#### Respuestas Paginadas

```typescript
// ✅ CORRECTO
{
  data: T[],  // Array de objetos
  meta: {
    limit: number,
    page: number,
    total: number,
    totalPages: number
  }
}
```

### Servicios

#### Patrón para Servicios que Extienden BaseService

```typescript
// ✅ Los métodos heredados ya retornan { data: T }
export class MyService extends BaseService<MyModel> {
  // findOne, create, update ya están estandarizados
}
```

#### Patrón para Servicios Personalizados

```typescript
export class MyCustomService {
  async create(dto: CreateDto): Promise<{ data: MyModel }> {
    const record = await this.prisma.model.create({ data: dto });
    return { data: record };
  }

  async findOne(id: number): Promise<{ data: MyModel }> {
    const record = await this.prisma.model.findUnique({ where: { id } });
    return { data: record };
  }

  async update(id: number, dto: UpdateDto): Promise<{ data: MyModel }> {
    const record = await this.prisma.model.update({ where: { id }, data: dto });
    return { data: record };
  }
}
```

### Hooks

Los hooks deben consumir las respuestas estandarizadas:

```typescript
// ✅ CORRECTO
export function useMyData(id: number) {
  return useQuery({
    queryKey: ["my-data", id],
    queryFn: () => MyService.findOne(id), // Retorna { data: T }
  });
}

// Para respuestas paginadas
export function useMyList(params?: QueryParams) {
  return useQuery({
    queryKey: ["my-list", params],
    queryFn: () => MyService.findAll(params).then((res) => res.data), // res.data es el array
  });
}
```

### Testing

#### Verificación de Formato de Respuesta

```typescript
// En tests de servicios
describe("MyService", () => {
  it("should return data wrapped in object", async () => {
    const result = await MyService.create(validDto);
    expect(result).toHaveProperty("data");
    expect(result.data).toBeDefined();
  });
});
```

### Code Reviews

Durante las revisiones de código, verificar:

- [ ] Servicios retornan `{ data: T }` para operaciones individuales
- [ ] Hooks consumen correctamente las respuestas envueltas
- [ ] Tipos TypeScript están actualizados
- [ ] Documentación de API refleja el formato correcto

### Migración

Si encuentras servicios que no siguen este patrón:

1. Actualizar el servicio para retornar `{ data: T }`
2. Actualizar el controlador correspondiente con Swagger specs
3. Verificar que los hooks consuman correctamente
4. Actualizar tests si es necesario

### Beneficios

- **Consistencia**: Todas las APIs siguen el mismo formato
- **Mantenibilidad**: Código predecible y fácil de entender
- **Type Safety**: Mejor soporte de TypeScript
- **Documentación**: Swagger genera documentación consistente
