# todo-summary-assistant

// === README.md ===
# Todo Summary Assistant

A full-stack app that lets users:
- Create and manage to-do tasks
- Summarize them using OpenAI
- Send summaries to Slack

## 🚀 Tech Stack
- Frontend: React
- Backend: Node.js + Express
- DB: Supabase (PostgreSQL)
- LLM: OpenAI API
- Slack Webhook for notifications

## 📦 Installation
```bash
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your Supabase, OpenAI, and Slack keys
node app.js
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Make sure REACT_APP_BACKEND_URL is correct
npm start
```

## 🔧 Supabase Setup
1. Create a project at https://app.supabase.com
2. Create a `todos` table:
   - `id` (UUID, Primary Key, default: `uuid_generate_v4()`)
   - `task` (text)
   - `done` (boolean, default: false)
3. Enable Row Level Security
4. Create policies for `SELECT`, `INSERT`, `DELETE` with `true` as expression

## 🔧 Slack Setup
1. Go to https://api.slack.com/apps
2. Create a new app and enable Incoming Webhooks
3. Choose a channel and copy the Webhook URL
4. Add it to your `.env`

## 🔧 OpenAI Setup
1. Get an API key from https://platform.openai.com/account/api-keys
2. Add it to your `.env`

## ✨ Features
- Add, view, and delete todos
- Click a button to summarize pending tasks
- Send the summary to a Slack channel

## 🧪 API Endpoints
- `GET /todos`
- `POST /todos`
- `DELETE /todos/:id`
- `POST /summarize`

---

✅ Project complete! 
