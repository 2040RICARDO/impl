# Etapa de construcción
FROM node:16 as build-stage
WORKDIR /app

# Copia package.json y package-lock.json para instalar dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente y compila la aplicación
COPY . .
RUN npm run build

# Etapa de producción
FROM php:8.1-fpm-alpine

# Instalar dependencias del sistema
RUN apk --no-cache add shadow

# Crear y usar un usuario no root
RUN usermod -u 1000 www-data
USER www-data

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copia el código fuente de Laravel
COPY --chown=www-data:www-data . .

# Copia los archivos compilados de Node
COPY --from=build-stage /app/public /var/www/html/public

# Instalar dependencias de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Exponer el puerto
EXPOSE 9000

# Ejecutar PHP-FPM
CMD ["php-fpm"]