# 📚 Documentación SAE-Frontend

Bienvenido a la documentación oficial de **SAE-Frontend**, el sistema de administración empresarial construido con Next.js 16, TypeScript y Tailwind CSS.

---

## 📌 Índice de Contenidos

### 🚀 Para Empezar

1. **[Getting Started](./getting-started.md)** - Instalación y configuración inicial
   - Prerequisitos
   - Instalación paso a paso
   - Configuración de variables de entorno
   - Primer run del proyecto
   - Verificación de la instalación

### 🏗️ Arquitectura y Diseño

2. **[Architecture](./architecture.md)** - Entender la estructura del proyecto
   - Arquitectura hexagonal
   - Estructura de carpetas
   - Patrones de diseño implementados
   - Flujo de datos
   - Gestión de estado
   - Sistema de diseño

### 🔌 Integración con APIs

3. **[API Integration](./api-integration.md)** - Cómo consumir el backend
   - Configuración del ApiClient
   - Autenticación JWT
   - Métodos HTTP (GET, POST, PUT, DELETE)
   - Servicios API
   - Custom Hooks con TanStack Query
   - Uso en componentes
   - Manejo de errores

### 🚀 Deployment

4. **[Deployment](./deployment.md)** - Desplegar a producción
   - Vercel (recomendado)
   - Docker
   - VPS/Server con PM2 y Nginx
   - Cloud providers (AWS, GCP, Azure)
   - Monitoreo y logging
   - Checklist de deployment

### 🔧 Troubleshooting

5. **[Troubleshooting](./troubleshooting.md)** - Resolver problemas comunes
   - Problemas de instalación
   - Problemas de autenticación
   - Problemas de API
   - Problemas de UI
   - Problemas de build
   - Problemas de Docker
   - Problemas de performance
   - Problemas de deployment

### 🤝 Contribuir

6. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Guía para contribuir
   - Estándares de API
   - Formato de respuestas
   - Patrones de servicios
   - Code reviews

---

## 🎯 Flujo de Lectura Recomendado

### Para Nuevos Desarrolladores

```
1. Getting Started      →  Configurar el proyecto
2. Architecture         →  Entender cómo funciona
3. API Integration      →  Aprender a usar APIs
4. Troubleshooting      →  Resolver problemas comunes
```

### Para DevOps/Deploy

```
1. Getting Started      →  Entender requisitos
2. Deployment           →  Configurar infraestructura
3. Troubleshooting      →  Debug en producción
```

### Para Arquitectos/Tech Leads

```
1. Architecture         →  Revisar decisiones de diseño
2. API Integration      →  Validar contratos de API
3. CONTRIBUTING         →  Establecer estándares
```

---

## 📚 Recursos Adicionales

### Documentación Externa

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **NextAuth.js:** https://next-auth.js.org
- **TanStack Query:** https://tanstack.com/query/latest
- **shadcn/ui:** https://ui.shadcn.com
- **Zod:** https://zod.dev

### Videos y Tutoriales

- Next.js 16 App Router: https://www.youtube.com/c/Vercel
- TypeScript Best Practices: https://typescript.tv
- Tailwind CSS Patterns: https://tailwindcss.com/docs/guides/nextjs

### Comunidades

- Next.js Discord: https://nextjs.org/discord
- React Discord: https://react.dev/community
- TypeScript Discord: https://discord.gg/typescript

---

## ❓ Preguntas Frecuentes (FAQ)

### ¿Qué versión de Node.js necesito?

Node.js 18.x o superior. Recomendado: 22.x

### ¿Puedo usar npm en lugar de yarn?

Sí, el proyecto está configurado para npm. Evita mezclar npm y yarn.

### ¿Dónde está el backend?

El backend es un proyecto separado (SAE-Backend) construido con NestJS. Debe estar corriendo en el puerto 3305.

### ¿Cómo genero el NEXTAUTH_SECRET?

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### ¿Por qué no cargan los estilos de Tailwind?

Verifica que `globals.css` esté importado en `app/layout.tsx` y reinicia el servidor.

### ¿Cómo habilito el modo debug?

```bash
# En .env.local
NEXTAUTH_DEBUG=true
NODE_ENV=development
```

### ¿Dónde veo los logs?

```bash
# Desarrollo
npm run dev  # Logs en la terminal

# Producción con PM2
pm2 logs sae-frontend

# Producción con Docker
docker logs -f sae-frontend
```

### ¿Cómo actualizo las dependencias?

```bash
# Ver actualizaciones disponibles
npm outdated

# Actualizar (con cuidado)
npm update

# O usar npm-check-updates
npx npm-check-updates -u
npm install
```

---

## 📧 Soporte

### Reportar Bugs

1. Verificar que no exista un issue similar
2. Crear issue en GitHub con:
   - Descripción del problema
   - Pasos para reproducir
   - Versión de Node.js y npm
   - Logs relevantes
   - Screenshots si aplica

### Solicitar Features

1. Crear issue con label `feature-request`
2. Describir el caso de uso
3. Proponer solución si es posible

### Contacto

- **GitHub Issues:** Para bugs y features
- **Email:** soporte@tuempresa.com
- **Documentación:** /docs (este directorio)

---

## 📝 Changelog

### v1.1.0 (Actual)

- ✅ Next.js 16.4.3 con App Router
- ✅ React 19.3.1
- ✅ TypeScript 5+ strict mode
- ✅ Tailwind CSS 4.0
- ✅ NextAuth.js 4.24+ con JWT
- ✅ TanStack Query 5.90+
- ✅ 80+ páginas y 200+ componentes
- ✅ Arquitectura hexagonal modular
- ✅ Sistema de diseño completo
- ✅ Docker support
- ✅ Documentación completa

---

## ✅ Quick Links

| Acción                 | Link                                      |
| ---------------------- | ----------------------------------------- |
| Iniciar desarrollo     | [Getting Started →](./getting-started.md) |
| Entender arquitectura  | [Architecture →](./architecture.md)       |
| Integrar APIs          | [API Integration →](./api-integration.md) |
| Desplegar a producción | [Deployment →](./deployment.md)           |
| Resolver problemas     | [Troubleshooting →](./troubleshooting.md) |
| Contribuir código      | [CONTRIBUTING →](../CONTRIBUTING.md)      |

---

**¡Gracias por usar SAE-Frontend!** 🚀

_Última actualización: Diciembre 2024_
