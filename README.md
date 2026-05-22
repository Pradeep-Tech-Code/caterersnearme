# CaterersNearMe

A full-stack catering directory built with Node.js, Express, MongoDB, Next.js, and React.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB running locally on `mongodb://localhost:27017`

### Backend Setup

```bash
cd backend
npm install
npm start
```

The API will start on `http://localhost:5000`. 
To run in development mode with auto-reload, use `npm run dev`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Next.js app will be available at `http://localhost:3000`.

## API Routes

- `GET /api/caterers` - List all caterers
- `GET /api/caterers/:id` - Get a single caterer
- `POST /api/caterers` - Add a new caterer
