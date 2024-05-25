# Usar una imagen base con PHP y Composer preinstalados
FROM php:8.2-apache

# Instalar dependencias adicionales de sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql

# Instalar Composer globalmente
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar Node.js y npm
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Instalar dependencias de Node.js
RUN npm install && npm run prod

# Establecer las variables de entorno
ENV APP_ENV=production
ENV APP_KEY=base64:your_app_key
ENV DB_CONNECTION=mysql
ENV DB_HOST=your_db_host
ENV DB_PORT=your_db_port
ENV DB_DATABASE=your_db_name
ENV DB_USERNAME=your_db_username
ENV DB_PASSWORD=your_db_password

# Exponer el puerto
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["apache2-foreground"]