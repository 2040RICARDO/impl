# Usar una imagen base que contenga PHP, Composer y Node.js
FROM laravelsail/php82-composer:latest

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Instalar Node.js y npm
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Instalar dependencias de Node.js
RUN npm install

# Construir los activos con Vite
RUN npm run build

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
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "80"]