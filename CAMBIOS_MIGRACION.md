# Cambios en la API para Cancelación y Entrega de Órdenes

## Resumen de cambios

Se han agregado nuevos campos al modelo `Order` en la API para soportar:
1. **Cancelación de órdenes** - Con motivo y fecha
2. **Entrega de órdenes** - Con fecha y nombre de quien recibe

## Archivos modificados

### 1. `src/models/order.js`

Se agregaron 4 nuevos campos al modelo:

```javascript
motivoCancelacion: { type: DataTypes.TEXT, allowNull: true },
fechaCancelacion: { type: DataTypes.STRING, allowNull: true },
fechaEntrega: { type: DataTypes.STRING, allowNull: true },
quienRecibe: { type: DataTypes.STRING, allowNull: true }
```

### 2. `migrate-add-delivery-fields.js` (NUEVO)

Script de migración que agrega los nuevos campos a la base de datos existente.

## Pasos para aplicar los cambios

### Paso 1: Actualizar el modelo (YA HECHO)

El archivo `src/models/order.js` ya incluye los nuevos campos.

### Paso 2: Ejecutar la migración en la base de datos

Ejecuta el siguiente comando en PowerShell:

```powershell
cd C:\Users\cesar\OneDrive\Escritorio\Trabajo\Ordenes-Servicio-api
node migrate-add-delivery-fields.js
```

Este script:
- Se conecta a la base de datos configurada en `.env`
- Agrega los 4 nuevos campos si no existen
- Si ya existen, no hace nada (es seguro ejecutar múltiples veces)

### Paso 3: Reiniciar la API

El controlador `ordersController.js` ya soporta estos campos automáticamente gracias a que Sequelize permite actualizar cualquier campo que esté en el modelo.

```powershell
npm run dev
```

## Nuevos campos en la API

Cuando se hace un `PUT /api/ordenes/:id`, ahora puedes incluir:

```json
{
  "estado": "Cancelado",
  "motivoCancelacion": "Equipo irreparable",
  "fechaCancelacion": "2025-12-09"
}
```

O para entrega:

```json
{
  "estado": "Entregado",
  "fechaEntrega": "2025-12-09",
  "quienRecibe": "Juan Pérez"
}
```

## Respuesta del servidor

Al obtener una orden (`GET /api/ordenes/:id`), ahora incluye:

```json
{
  "id": 1,
  "folio": "ORD-001",
  "estado": "Entregado",
  "fechaEntrega": "2025-12-09",
  "quienRecibe": "Juan Pérez",
  "motivoCancelacion": null,
  "fechaCancelacion": null,
  ...otros campos
}
```

## Verificación

Para verificar que la migración se ejecutó correctamente, puedes revisar la tabla en MySQL:

```sql
DESCRIBE Orders;
```

Deberías ver las 4 nuevas columnas:
- `motivoCancelacion`
- `fechaCancelacion`
- `fechaEntrega`
- `quienRecibe`
