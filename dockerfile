# Usar una imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalar las dependencias usando Yarn
RUN yarn install --frozen-lockfile

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación para producción (opcional, si quieres usar el servidor de desarrollo)
# RUN yarn build

# Exponer el puerto 3000 (puerto predeterminado de Vite)
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo de Vite
CMD ["yarn", "start"]