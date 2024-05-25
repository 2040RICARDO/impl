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
ENV APP_ENV=local
ENV APP_KEY=base64:LxC2QdVkDvID/xwhxaELvPNExfo9/5stPhM6wqDO3xU=
ENV DB_CONNECTION=mysql
ENV DB_HOST=mysql-react-laravel.alwaysdata.net
ENV DB_PORT=3306
ENV DB_DATABASE=react-laravel_electro
ENV DB_USERNAME=360271_electro
ENV DB_PASSWORD=electro_react

# Exponer el puerto
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]