# Blog API (Express + MongoDB)

## Setup
1. Install MongoDB locally (or use a MongoDB Atlas connection string).
2. `npm install`
3. Create `.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/blogDB
   NODE_ENV=development
   ```
4. `npm run dev` (nodemon) or `npm start`
5. Open http://localhost:5000 -> "Blog API is running"

## Blog schema
| Field | Type | Required |
|---|---|---|
| title | String | yes |
| description | String | yes |
| content | String | yes |
| author | String | yes |
| image | String (URL/path) | no |

Timestamps `createdAt` / `updatedAt` are added automatically.

## Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/blogs | All blogs (add `?search=text` to filter by title) |
| GET | /api/blogs/:id | One blog |
| POST | /api/blogs | Create |
| PUT | /api/blogs/:id | Update |
| DELETE | /api/blogs/:id | Delete |

Errors: 400 invalid ID / missing fields, 404 not found, 500 server error. All as `{ "message": "..." }`.
