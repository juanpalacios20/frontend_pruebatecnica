## 🚀 Requisitos Previos

Antes de comenzar, asegurarse de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [Docker](https://www.docker.com/) (opcional para despliegue)
- [Git](https://git-scm.com/)

---

## 🛠️ Instalación y Ejecución Local

bash
1. Clonar el repositorio
git clone https://github.com/juanpalacios20/frontend_pruebatecnica/.git
cd frontend_pt

2. Instalar las dependencias
npm install

3. Ejecuta el servidor de desarrollo
npm run dev

La app se ejecuta en http://localhost:5173/

Para el despliegue en docker se deben realizar 2 pasos.

1. Contruir la imagen
docker-compose build --no-cache

2. Ejecutar el contenedor
docker run -p 80:80 frontend_pt

Actualmente la app ya se encuentra en un host y su dirección es https://frontend-pruebatecnica.onrender.com/
