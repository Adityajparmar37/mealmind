# MealMind — AI Cooking To-Do List

MealMind is a full-stack AI micro-app that generates a complete day's meal plan based on your preferences. Powered by Google Gemini, it returns structured breakfast/lunch/dinner/snacks cards, a grocery list with cost estimates, smart substitutions, and an interactive cooking to-do checklist.

## Tech Stack

- **Frontend:** React (Vite), plain CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **AI:** Google Gemini (`gemini-1.5-flash`)

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd mealmind
npm run install:all
```

### 2. Configure environment

Edit `server/.env`:

```
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/mealmind
PORT=5000
```

Get your Gemini API key at https://aistudio.google.com/app/apikey

### 3. Run

Open two terminals:

```bash
# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend
npm run dev:client
```

Frontend runs at `http://localhost:5173`, API at `http://localhost:5000`.

> MongoDB is optional — the app still generates plans if the DB is unavailable; it just won't save history.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/meal-plan/generate` | Generate a new meal plan |
| GET | `/api/meal-plan/history` | Last 5 saved plans |
| DELETE | `/api/meal-plan/:id` | Delete a saved plan |

### POST `/api/meal-plan/generate`

Request body:
```json
{
  "people": 2,
  "budget": 500,
  "diet": "Vegetarian",
  "cuisine": "Indian",
  "allergies": "nuts",
  "dayType": "Weekday"
}
```

## Features

- 6-field preference form with radio buttons and dropdowns
- Meal cards for Breakfast, Lunch, Dinner, Snacks with expandable cooking steps
- Interactive cooking to-do checklist with progress bar
- Grocery list table with per-item cost and clipboard copy
- Budget feasibility badge (Within / Slightly Over / Over Budget) with savings tip
- Smart substitution pills (e.g. Paneer → Tofu)
- Last 5 plan history with click-to-restore and delete
- Responsive layout (two-column desktop, single-column mobile)
- Loading and error states

---

*Built with MealMind — because dinner decisions are hard.*
