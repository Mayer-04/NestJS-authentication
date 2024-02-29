# NestJS Autenticación 🔒🐈

Este proyecto es una API REST desarrollada en **NestJS** y **MongoDB** para la gestión de autenticación de usuarios. Proporciona funcionalidades de registro (register) y inicio de sesión (login), utilizando tecnologías y prácticas modernas para garantizar la seguridad y la eficiencia del sistema.

## Características principales

- Registro de usuarios con validación de datos utilizando **class-validator**.
- Uso de ODM **Mongoose** para las diferentes consultas a la base de datos.
- Inicio de sesión con generación de tokens **JWT** para la autenticación.
- Gestión de sesiones mediante **cookies** para mantener la autenticación del usuario.
- Implementación de patrones de diseño como DTOs, entidades y buenas prácticas como separación de funciones, constantes e interfaces para tener un mejor tipado del código.

## Requisitos

- [Node.js](https://nodejs.org/en) (v16.0.0 o superior)
- [pnpm](https://pnpm.io/es/) (Puedes instalarlo globalmente con `npm install -g pnpm` o habilitando Corepack con `corepack enable pnpm` desde la v16.13 de Node.js)

## Instalación y Uso

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Mayer-04/NestJS-authentication.git
   ```

2. Instalar las dependencias:

    ```bash
   pnpm install
   ```

3. Clonar el archivo **.env.template** a **.env** para configurar las variables de entorno. Credenciales de la base de datos y token JWT.
4. Ejecutar `pnpm start:dev` para levantar el proyecto en modo desarrollo.
5. Accede a la API desde:

    ```bash
   http://localhost:5000/api/auth/[register|login]
   ```
