# CashMind - Quick Setup Guide

## Project Overview

CashMind is a complete mobile application for budget control and task management, featuring:
- React Native (Expo) frontend
- Django REST Framework backend
- SQLite database
- Full CRUD operations for finances and tasks

## Quick Start (5 Minutes)

### Backend Setup

1. **Navigate to backend:**
```bash
cd budjet
```

2. **Install dependencies:**
```bash
pip install Django==4.2.1 djangorestframework==3.14.0 django-cors-headers==4.0.0
```

3. **Run migrations:**
```bash
python manage.py migrate
```

4. **Create admin user:**
```bash
python manage.py createsuperuser
```

5. **Start server:**
```bash
python manage.py runserver
```

Backend will be running at: http://localhost:8000

### Frontend Setup

1. **Navigate to frontend (in new terminal):**
```bash
cd CashMindApp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start Expo:**
```bash
npm start
```

4. **Run on platform:**
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web

## Creating Sample Data

1. Go to Django admin: http://localhost:8000/admin
2. Login with superuser credentials
3. Create some categories:
   - Name: "Groceries", Budget: $500, Color: #4CAF50
   - Name: "Transport", Budget: $200, Color: #2196F3
   - Name: "Entertainment", Budget: $150, Color: #FF9800

## API Endpoints

### Financial
- GET `/api/financial-summary/` - Overall summary
- GET `/api/category-expenses/` - Budget by category
- GET/POST `/api/incomes/` - Income management
- GET/POST `/api/expenses/` - Expense management
- GET/POST `/api/debts/` - Debt tracking
- GET/POST `/api/savings/` - Savings tracking

### Tasks
- GET/POST `/api/tasks/` - Task list
- PATCH `/api/tasks/{id}/` - Update task
- DELETE `/api/tasks/{id}/` - Delete task

## App Features

### Home Screen
- Financial summary cards
- Upcoming tasks preview
- Pull-to-refresh

### Budget Screen
- Category-based budget tracking
- Visual progress bars
- Add expense modal
- Real-time budget status

### To-Do List Screen
- Create tasks with priorities
- Set due dates
- Mark tasks complete
- Delete tasks

### Profile Screen
- User profile settings
- Financial preferences
- App configuration

## Troubleshooting

### Backend Issues

**Django not found:**
```bash
pip install Django==4.2.1
```

**Migration errors:**
```bash
# Delete db.sqlite3 and run:
python manage.py migrate
```

**Port already in use:**
```bash
python manage.py runserver 8001
# Update API_BASE_URL in CashMindApp/services/api.ts
```

### Frontend Issues

**Expo not starting:**
```bash
npm install -g expo-cli
expo start --clear
```

**API connection failed:**
- Check backend is running
- Verify API_BASE_URL in `services/api.ts`
- For Android emulator, use: http://10.0.2.2:8000
- For iOS simulator, use: http://localhost:8000
- For physical device, use your computer's IP

**Module not found:**
```bash
rm -rf node_modules
npm install
```

## Development Tips

1. **Hot Reload:** Both frontend and backend support hot reload
2. **Debugging:** Use React Native Debugger for frontend
3. **API Testing:** Use Django admin or Postman
4. **Data Reset:** Delete db.sqlite3 and run migrations again

## Project Structure

```
control-the-budget-and-manage-a-to-do-list/
├── CashMindApp/              # React Native App
│   ├── app/(tabs)/           # Main screens
│   ├── services/api.ts       # API client
│   └── package.json
│
├── budjet/                   # Django Backend
│   ├── budjet/               # Settings
│   ├── managment/            # Main app
│   └── requirements.txt
│
└── README.md
```

## Next Steps

1. **Customize Categories:** Add your own expense categories in Django admin
2. **Add Sample Data:** Create income, expenses, and tasks
3. **Configure Settings:** Update currency, budget periods
4. **Deploy:** Follow deployment guides in README.md

## Support

- Check README.md for detailed documentation
- View API docs at: http://localhost:8000/api/
- Django admin: http://localhost:8000/admin/

## Features Implemented

✅ Complete financial tracking system
✅ Category-based budgeting
✅ Debt management (borrowed/owed)
✅ Savings tracker
✅ Task management with priorities
✅ Due date tracking
✅ Pull-to-refresh on all screens
✅ Beautiful UI with color coding
✅ RESTful API backend
✅ Cross-platform mobile app

---

Built with React Native (Expo) + Django REST Framework

