# SocialNetwork — Backend

**UA** · [EN](#en-version)

---

## Мета проєкту

Цей репозиторій містить бекенд для соціальної мережі, створений як навчальний проєкт для практики розробки API, роботи з базами даних, аутентифікації, реального часу та обробки медіафайлів.

У процесі роботи над ним було опановано:

- розробку серверної частини на **Node.js** та **Express**
- типізований код на **TypeScript**
- роботу з **Prisma ORM** та локальною базою **SQLite**
- створення реального чату через **Socket.IO**
- безпечну авторизацію за допомогою **JWT** та **bcryptjs**
- обробку завантажень файлів через **Multer** та **Sharp**
- валідацію запитів за допомогою **Yup**

---

## Технології та інструменти

| Технологія                | Опис                                         |
| ------------------------- | -------------------------------------------- |
| **Node.js**               | Середовище виконання сервера                 |
| **TypeScript**            | Статична типізація backend-коду              |
| **Express**               | HTTP-сервер та маршрутизація API             |
| **Prisma ORM**            | Модель даних, міграції та доступ до БД       |
| **SQLite**                | Локальна база даних для проєкту              |
| **Socket.IO**             | Реальний час для чату та повідомлень         |
| **JWT**                   | Аутентифікація та авторизація користувачів   |
| **bcryptjs**              | Хешування паролів                            |
| **Yup**                   | Валідація вхідних даних                      |
| **Multer**                | Завантаження файлів на сервер                |
| **Sharp**                 | Обробка та оптимізація зображень             |
| **Cors**                  | Підтримка CORS для клієнта                   |
| **dotenv**                | Робота з environment variables               |
| **EmailJS Node.js SDK**   | Надсилання email-повідомлень                 |
| **ts-node / ts-node-dev** | Запуск TypeScript без попередньої компіляції |

---

## Структура проєкту

```
src/
├── app/                # Ініціалізація Express-додатку та маршрути
├── config/             # Конфігурація середовища та шляхів
├── errors/             # Кастомні помилки застосунку
├── middlewares/        # Auth, validation, error handling, upload middleware
├── modules/            # Бізнес-логіка за модулями
│   ├── albums/         # Альбоми та фото
│   ├── chat/           # Чати, повідомлення, сокети
│   ├── friends/        # Друзі та заявки
│   ├── mail/           # Email-логіка
│   ├── posts/          # Пости та медіа
│   ├── settings/       # Налаштування профілю
│   └── user/           # Користувачі та профілі
├── prisma/             # Prisma client wrapper
├── socket/             # Socket.IO manager
├── generated/          # Генерований Prisma client
└── types/              # Загальні TypeScript-типи
```

---

## Основні можливості

- реєстрація та вхід користувачів
- JWT-авторизація та захист маршрутів
- профілі користувачів та налаштування
- друзі та запити в друзі
- пости з медіафайлами
- альбоми з фотографіями
- особисті та групові чати в реальному часі
- надсилання email через EmailJS
- завантаження та обробка зображень

---

## Вимоги

- Node.js
- npm
- доступ до локальної файлової системи для роботи з медіа

---

## Як запустити

### 1. Встановлення залежностей

```bash
npm install
```

### 2. Підготовка бази даних

```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Запуск у режимі розробки

```bash
npm run dev
```

### 4. Запуск у production-режимі

```bash
npm start
```

---

## Конфігурація середовища

Проєкт використовує змінні середовища через файл `.env`. У ньому зазвичай задаються параметри для:

- JWT-секрету
- EmailJS/SMTP-налаштувань
- шляхів до медіа
- інших службових параметрів

---

## База даних

Проєкт використовує Prisma з SQLite. Схема описана у папці `prisma/`, а міграції зберігаються у `prisma/migrations/`.

---

## Висновок

Backend SocialNetwork містить повний набір функцій для соціального застосунку: авторизацію, роботу з контентом, чат у реальному часі, медіа-обробку та організацію коду за модулями. Проєкт є хорошим прикладом поєднання Express, TypeScript, Prisma та Socket.IO в одному застосунку.

---

---

# EN Version

## Project goal

This repository contains the backend for a social network, built as a learning project to practice API development, database work, authentication, real-time communication, and media handling.

During development, the following were covered:

- server-side development with **Node.js** and **Express**
- typed code with **TypeScript**
- database access with **Prisma ORM** and **SQLite**
- real-time chat with **Socket.IO**
- secure authentication using **JWT** and **bcryptjs**
- file uploads with **Multer** and **Sharp**
- request validation with **Yup**

---

## Technologies and tools

| Technology                | Description                                  |
| ------------------------- | -------------------------------------------- |
| **Node.js**               | Server runtime                               |
| **TypeScript**            | Static typing for backend code               |
| **Express**               | HTTP server and API routing                  |
| **Prisma ORM**            | Data model, migrations, and database access  |
| **SQLite**                | Local database for the project               |
| **Socket.IO**             | Real-time chat and messaging                 |
| **JWT**                   | Authentication and authorization             |
| **bcryptjs**              | Password hashing                             |
| **Yup**                   | Input validation                             |
| **Multer**                | File upload handling                         |
| **Sharp**                 | Image processing and optimization            |
| **Cors**                  | CORS support for the client                  |
| **dotenv**                | Environment variable management              |
| **EmailJS Node.js SDK**   | Sending email messages                       |
| **ts-node / ts-node-dev** | Running TypeScript without prior compilation |

---

## Project structure

```
src/
├── app/                # Express app initialization and routes
├── config/             # Environment and path configuration
├── errors/             # Custom application errors
├── middlewares/        # Auth, validation, error handling, upload middleware
├── modules/            # Feature-based business logic
│   ├── albums/         # Albums and photos
│   ├── chat/           # Chats, messages, sockets
│   ├── friends/        # Friends and requests
│   ├── mail/           # Email logic
│   ├── posts/          # Posts and media
│   ├── settings/       # Profile settings
│   └── user/           # Users and profiles
├── prisma/             # Prisma client wrapper
├── socket/             # Socket.IO manager
├── generated/          # Generated Prisma client
└── types/              # Shared TypeScript types
```

---

## Main features

- user registration and login
- JWT-based authorization and route protection
- user profiles and settings
- friends and friend requests
- posts with media content
- photo albums
- real-time private and group chats
- email sending via EmailJS
- file uploads and image processing

---

## Requirements

- Node.js
- npm
- local filesystem access for media storage

---

## How to run

### 1. Install dependencies

```bash
npm install
```

### 2. Prepare the database

```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Start in development mode

```bash
npm run dev
```

### 4. Start in production mode

```bash
npm start
```

---

## Environment configuration

The project uses environment variables from a `.env` file. Typical values include:

- JWT secret
- EmailJS/SMTP settings
- media paths
- other service-specific variables

---

## Database

The project uses Prisma with SQLite. The schema is defined in the `prisma/` folder, and migrations are stored in `prisma/migrations/`.

---

## Conclusion

The SocialNetwork backend includes a full set of features for a social application: authentication, content management, real-time chat, media handling, and modular code organization. It is a good example of combining Express, TypeScript, Prisma, and Socket.IO in one application.
