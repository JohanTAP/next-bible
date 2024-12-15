# Next Bible

Una aplicación moderna para estudiar la Biblia con referencias Strong, construida con Next.js.

## Características

- 📖 Lectura de la Biblia
- 🔍 Búsqueda de referencias Strong
- 🌙 Modo oscuro/claro
- 📱 Diseño responsive
- ⚡ Rendimiento optimizado

## Requisitos Previos

- Node.js 18.x o superior
- pnpm (recomendado) o npm

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd next-bible
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Crear un archivo `.env.local` con las variables de entorno necesarias:
```env
# Agregar variables de entorno si son necesarias
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
next-bible/
├── app/                # Rutas y páginas de Next.js
├── components/         # Componentes React reutilizables
├── constants/         # Constantes y configuraciones
├── data/             # Datos estáticos
├── hooks/            # Custom React hooks
├── lib/              # Utilidades y funciones auxiliares
├── public/           # Archivos estáticos
├── services/         # Servicios y lógica de negocio
└── types/            # Definiciones de tipos TypeScript
```

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Crea una build de producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter

## Tecnologías Principales

- Next.js
- React
- TypeScript
- TailwindCSS
- Radix UI

## Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Licencia

[Especificar la licencia]
