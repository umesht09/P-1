# SwiftCatalog

A MERN stack catalog management app: Express/MongoDB backend with a searchable, filterable, paginated React catalog and full CRUD.

## Structure

- `backend/` — Express + Mongoose API
- `frontend/` — React + Vite + Tailwind CSS dashboard

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # set PORT and MONGO_URI
npm run dev            # or: npm start
```

Runs on `http://localhost:5000`. Health check: `GET /api/health`.

### API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/items` | List items (pagination, search, filter, sort) |
| GET | `/api/items/:id` | Get a single item |
| POST | `/api/items` | Create an item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

Query params for `GET /api/items`: `page`, `limit`, `search`, `category`, `status`, `sortBy` (`price`, `createdAt`, `title`), `sortOrder` (`asc`, `desc`).

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

Runs on `http://localhost:5173`. Requires the backend to be running.

## Item Model

| Field | Type | Notes |
|---|---|---|
| title | String | required |
| category | String | required, enum: Electronics, Apparel, Home Goods, Books, Other |
| description | String | optional |
| price | Number | required, min 0 |
| status | String | required, enum: In Stock, Out of Stock |
