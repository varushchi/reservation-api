# Тестовое задание

## Реализовать API для бронирования места на мероприятие

1. Клонировать репозиторий, устоновить зависимости
``` bash
git clone https://github.com/varushchi/reservation-api/
cd reservation-api
npm i
```
2. Скопировать env
``` bash
cp .env.example .env
```
3. Запустить БД
``` bash
docker compose up -d
```
4. Запустить миграции, заполнить моковыми данными
``` bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```
5. Запустить сервер на порте 8000
``` bash
npm run dev:tsx
```
6. ? Открыть таблицы ?
``` bash
npx prisma studio
```
