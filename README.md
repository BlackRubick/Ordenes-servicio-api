# Ordenes-Servicio API

API REST básica con Node.js, Express, MySQL y Sequelize diseñada para integrarse con el front `Ordenes-Servicio-Front`.

Rutas principales:
- `POST /api/auth/register` - registrar usuario
- `POST /api/auth/login` - login (devuelve JWT)
- `GET /api/ordenes` - listar órdenes (requiere token)
- `POST /api/ordenes` - crear orden (requiere token)
- `GET /api/ordenes/:id` - ver orden (requiere token)
- `PUT /api/ordenes/:id` - actualizar orden (requiere token)
- `DELETE /api/ordenes/:id` - eliminar orden (requiere token)

Instalación y uso:

1. Coloca el proyecto en `C:\Users\cesar\OneDrive\Escritorio\Trabajo\Ordenes-Servicio-api`.
2. Copia `.env.example` a `.env` y configura los valores de la DB y `JWT_SECRET`.
3. Crea la base de datos indicada en `.env` (ej. `ordenes_db`).
4. Instala dependencias y ejecuta:

```powershell
cd C:\Users\cesar\OneDrive\Escritorio\Trabajo\Ordenes-Servicio-api
npm install
npm run dev
```

La API usa `sequelize.sync()` para crear tablas automáticamente. Para producción recomendamos migraciones y mayor cuidado con credenciales.

Integración con el frontend:
- Usa `POST /api/auth/login` para obtener `token`.
- Incluye el header `Authorization: Bearer <token>` en llamadas a `/api/ordenes`.

Extensiones posibles: modelos para `Products`, `Technicians`, endpoints para PDF/descarga, validaciones con `express-validator`, paginación, y manejo de archivos.

Crear la base de datos automáticamente (opcional):

Si prefieres, puedes ejecutar un script Node que crea la base de datos indicada en `.env` antes de arrancar la app:

```powershell
cd C:\Users\cesar\OneDrive\Escritorio\Trabajo\Ordenes-Servicio-api
node create-db.js
```

Este script usa las variables `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_PORT` y `DB_NAME` de tu `.env`.
