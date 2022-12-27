FROM php:8.1.4-fpm

ARG user=www-data
# load arguments/variables form docker-compose.yml
ARG uid
ARG gid

RUN cp /etc/passwd /etc/passwd.back

RUN sed -i -e "s/^${user}:\([^:]*\):[0-9]*:[0-9]*/${user}:\1:${uid}:${gid}/"  /etc/passwd
RUN sed -i -e "s/^${user}:\([^:]*\):[0-9]*/${user}:\1:${gid}/"  /etc/group

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# install packages for php to use symfony and mysql
RUN apt update \
    && apt install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN pecl install xdebug && docker-php-ext-enable xdebug

# define project root
WORKDIR /var/www/app

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# install symfony indtaller and composer
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN printf '[PHP]\ndate.timezone = "Europe/Berlin"\n' > /usr/local/etc/php/conf.d/tzone.ini