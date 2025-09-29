# **EventPlus – Backend**

A robust **Node.js + Express** REST API that aggregates hackathons and tech events from **Devfolio**, **Unstop**, and **Devpost** into a single, filterable feed for the EventPlus frontend.

---

## 🚀 Features

* **Unified API**: Normalizes events from multiple external providers.
* **Filter & Query**: Search by platform, type, deadline range, and keywords.
* **Refresh Endpoint**: Trigger a fresh data pull on demand.
* **Database Support**: Works with **MongoDB** (Mongoose) or **PostgreSQL** (Prisma).
* **Secure & Scalable**: CORS, Helmet, and environment-based configuration.
* **JSON Responses**: Clean, structured REST endpoints for easy frontend integration.

---

## 🛠️ Languages & Technologies

### Core

* **JavaScript (ES6+)** or **TypeScript** (optional)
* **Node.js**: Runtime environment
* **Express.js**: Web framework

### Database (Choose One)

* **MongoDB + Mongoose**: Flexible NoSQL option
* **PostgreSQL + Prisma**: Relational database with ORM

### Utilities & Middleware

* **Axios / node-fetch**: Fetch external provider data
* **CORS**: Cross-origin resource sharing
* **Helmet**: Security headers
* **Morgan**: HTTP request logger
* **Dotenv**: Environment variable management

---

## 📋 Prerequisites

* **Node.js** v16 or higher
* **npm** or **yarn** package manager
* Running database (MongoDB or PostgreSQL)

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/eventplus-backend.git
   cd eventplus-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the project root:

   ```ini
   # Server
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173

   # Database (choose one)
   MONGODB_URI=mongodb://127.0.0.1:27017/eventplus
   # DATABASE_URL=postgresql://user:password@localhost:5432/eventplus?schema=public
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The API runs at **[http://localhost:5000](http://localhost:5000)**

---

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

Run the compiled build:

```bash
npm start
# or
yarn start
```

---

## 🔗 API Endpoints

Base URL: `/api`

| Method | Endpoint              | Description                                                                         |
| ------ | --------------------- | ----------------------------------------------------------------------------------- |
| GET    | `/api/health`         | Health check `{ "status": "ok" }`                                                   |
| GET    | `/api/events`         | Fetch events with query params: `platform`, `type`, `q`, `before`, `after`, `limit` |
| POST   | `/api/events/refresh` | Force refresh from providers (optional body: `{ providers?: string[] }`)            |

---

## 📁 Project Structure

```
├── src/
│   ├── index.js / index.ts       # Entry point
│   ├── app.js                    # Express app setup
│   ├── routes/
│   │   └── events.routes.js
│   ├── controllers/
│   │   └── events.controller.js
│   ├── services/
│   │   ├── devfolio.service.js
│   │   ├── unstop.service.js
│   │   └── devpost.service.js
│   ├── models/                   # Mongoose/Prisma schemas
│   ├── lib/                      # DB connections & utilities
│   └── utils/
├── package.json
├── .env
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit changes:

   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Support
Built with ❤️ by **Mrunal Mehar**.

---
