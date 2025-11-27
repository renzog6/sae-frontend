# Pull Request Template - SAE Frontend

## Descripción

[Describe brevemente los cambios realizados]

## Tipo de Cambio

- [ ] 🐛 **Fix**: Corrección de bug
- [ ] ✨ **Feature**: Nueva funcionalidad
- [ ] 🔄 **Refactor**: Cambio de código sin afectar funcionalidad
- [ ] 📚 **Documentation**: Cambios en documentación
- [ ] 🧪 **Test**: Agregar o modificar tests
- [ ] 🔧 **Chore**: Cambios de configuración, dependencias, etc.

## Checklist de Revisión

### 🔍 **Estándares de Código**

- [ ] Código sigue las guías de estilo del proyecto
- [ ] Variables y funciones tienen nombres descriptivos
- [ ] Código está bien comentado donde es necesario
- [ ] No hay código comentado innecesario

### 🧪 **Testing**

- [ ] Tests existentes pasan
- [ ] Nuevos tests agregados si corresponde
- [ ] Cobertura de tests mantenida o mejorada
- [ ] Tests de integración verificados

### 📡 **API Standards** (Importante)

- [ ] **Servicios retornan `{ data: T }`** para respuestas individuales
- [ ] **Respuestas paginadas** siguen formato `{ data: T[], meta: {...} }`
- [ ] **Hooks consumen correctamente** las respuestas de API
- [ ] **Tipos TypeScript** actualizados si es necesario
- [ ] **Documentación Swagger** refleja formato correcto

### 🔄 **Integración**

- [ ] Cambios compatibles con versiones anteriores
- [ ] No rompe funcionalidad existente
- [ ] Endpoints de API funcionan correctamente
- [ ] Base de datos migrations incluidas si aplica

### 📚 **Documentación**

- [ ] README actualizado si es necesario
- [ ] Comentarios en código para lógica compleja
- [ ] Documentación de API actualizada
- [ ] Guía de contribución actualizada si aplica

### 🚀 **Performance**

- [ ] No hay degradación significativa de performance
- [ ] Consultas a BD optimizadas
- [ ] Bundle size no aumenta innecesariamente

## Screenshots/Videos

[Si aplica, incluir capturas o videos de los cambios]

## Notas Adicionales

[Cualquier información adicional relevante]

## Checklist para Reviewer

- [ ] **API Standards**: Verificar formato `{ data: T }` consistente
- [ ] **Type Safety**: Tipos TypeScript correctos
- [ ] **Testing**: Tests pasan y cubren casos edge
- [ ] **Performance**: Sin regresiones de performance
- [ ] **Security**: No introduce vulnerabilidades

---

**Recuerda**: Todos los servicios deben retornar `{ data: T }` para operaciones individuales. Si encuentras inconsistencias, por favor solicita corrección antes del merge.
