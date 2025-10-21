# Notes Backend (Express)

An Express-based REST API for managing notes with full CRUD operations.

- Server defaults to PORT=3001
- CORS enabled
- In-memory storage (resets on restart)
- Swagger docs available at /docs

## Getting Started

Install dependencies and run:

```
npm install
npm run dev
# or
npm start
```

Environment variables (optional) are listed in `.env.example`.

## Health

GET /health

Response:
{
  "status": "ok",
  "message": "Service is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}

## Notes API

Base path: /notes

- GET /notes
  - 200 OK: Returns array of notes

- GET /notes/:id
  - 200 OK: Returns a note
  - 400 Bad Request: Invalid id
  - 404 Not Found: Note does not exist

- POST /notes
  - Body: { "title": "string", "content": "string" }
  - 201 Created: Returns created note
  - 400 Bad Request: Validation error

- PUT /notes/:id
  - Body: { "title": "string?", "content": "string?" } (at least one field required)
  - 200 OK: Returns updated note
  - 400 Bad Request: Invalid id or payload
  - 404 Not Found: Note does not exist

- DELETE /notes/:id
  - 204 No Content: Note deleted
  - 400 Bad Request: Invalid id
  - 404 Not Found: Note does not exist

### Note object

{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}

## cURL Examples

Create:
curl -X POST http://localhost:3001/notes -H "Content-Type: application/json" -d '{"title":"First","content":"Hello"}'

List:
curl http://localhost:3001/notes

Get by id:
curl http://localhost:3001/notes/<id>

Update:
curl -X PUT http://localhost:3001/notes/<id> -H "Content-Type: application/json" -d '{"title":"Updated"}'

Delete:
curl -X DELETE http://localhost:3001/notes/<id>

## Development

- Run `npm run dev` for auto-reload with nodemon.
- API docs at `/docs`.
